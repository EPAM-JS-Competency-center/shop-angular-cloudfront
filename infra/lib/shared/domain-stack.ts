import * as cdk from 'aws-cdk-lib/core';
import { aws_route53, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface DomainStackProps extends cdk.StackProps {
  domainName: string;
}

/**
 * Creates the Route 53 hosted zone for the project's domain.
 */
export class DomainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DomainStackProps) {
    super(scope, id, props);

    // Creates the Route 53 hosted zone.
    const hostedZone = new aws_route53.HostedZone(this, 'HostedZone', {
      // The domain name for which to create the hosted zone.
      zoneName: props.domainName,
    });

    // Outputs the name servers for the hosted zone.
    new CfnOutput(this, 'NameServers', {
      value: cdk.Fn.join(', ', hostedZone.hostedZoneNameServers ?? []),
      description: 'Set these nameservers at your domain registrar',
    });
  }
}
