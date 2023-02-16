'use strict';

const spawnSync = require('child_process').spawnSync;

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      invalidateCFCache: {
        usage: 'Invalidates CloudFront cache',
        lifecycleEvents: [
          'invalidateCFCache',
        ],
      },
    };

    this.hooks = {
      'invalidateCFCache:invalidateCFCache': this.invalidateCFCache.bind(this, ),
    };
  }

  runAwsCommand(args) {
    let command = 'aws';
    if (this.serverless.variables.service.provider.region) {
      command = `${command} --region ${this.serverless.variables.service.provider.region}`;
    }
    if (this.serverless.variables.service.provider.profile) {
      command = `${command} --profile ${this.serverless.variables.service.provider.profile}`;
    }
    const result = spawnSync(command, args);

    const stdout = typeof result.stdout === 'string' ? result.stdout : result.stdout && result.stdout.toString() ;
    const sterr = typeof result.stderr === 'string' ? result.stderr : result.stderr && result.stderr.toString();
    if (stdout) {
      this.serverless.cli.log(stdout);
    }
    if (sterr) {
      this.serverless.cli.log(sterr);
    }

    return { stdout, sterr };
  }

  // fetches the domain name from the CloudFront outputs and prints it out
  async domainInfo() {
    const provider = this.serverless.getProvider('aws');
    const stackName = provider.naming.getStackName(this.options.stage);
    const result = await provider.request(
      'CloudFormation',
      'describeStacks',
      { StackName: stackName },
      this.options.stage,
      this.options.region,
    );

    const outputs = result.Stacks[0].Outputs;
    const output = outputs.find(
      entry => entry.OutputKey === 'WebAppCloudFrontDistributionOutput',
    );

    if (output && output.OutputValue) {
      this.serverless.cli.log(`Web App Domain: ${output.OutputValue}`);
      return output.OutputValue;
    }

    this.serverless.cli.log('Web App Domain: Not Found');
    const error = new Error('Could not extract Web App Domain');
    throw error;
  }

  async invalidateCFCache() {
    const provider = this.serverless.getProvider('aws');
  
    const domain = await this.domainInfo();
  
    const result = await provider.request(
      'CloudFront',
      'listDistributions',
      {},
      this.options.stage,
      this.options.region,
    );
  
    const distributions = result.DistributionList.Items;
    const distribution = distributions.find(
      entry => entry.DomainName === domain,
    );
  
    if (distribution) {
      this.serverless.cli.log(
        `Invalidating CloudFront distribution with id: ${distribution.Id}`,
      );
      const args = [
        'cloudfront',
        'create-invalidation',
        '--distribution-id',
        distribution.Id,
        '--paths',
        '/*',
      ];
      const { sterr } = this.runAwsCommand(args);
      if (!sterr) {
        this.serverless.cli.log('Successfully invalidated CloudFront cache');
      } else {
        throw new Error('Failed invalidating CloudFront cache');
      }
    } else {
      const message = `Could not find distribution with domain ${domain}`;
      const error = new Error(message);
      this.serverless.cli.log(message);
      throw error;
    }
  }
}

module.exports = ServerlessPlugin;
