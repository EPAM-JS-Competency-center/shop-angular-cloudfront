import { aws_certificatemanager, aws_route53 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DOMAIN_NAME } from './config';

interface Resources {
  hostedZone: aws_route53.IHostedZone;
  certificate: aws_certificatemanager.ICertificate;
}

interface Options {
  /** Primary domain for the certificate */
  domainName: string;
  /** Optional alternative names */
  subjectAlternativeNames?: string[];
}

/**
 * Looks up the project's hosted zone and creates an ACM certificate for it.
 */
export function createDomainResources(
  scope: Construct,
  options: Options,
): Resources {
  // Find hosted zone
  const hostedZone = aws_route53.HostedZone.fromLookup(scope, 'HostedZone', {
    domainName: DOMAIN_NAME,
  });

  // Create certificate
  const certificate = new aws_certificatemanager.Certificate(scope, 'Certificate', {
    domainName: options.domainName,
    subjectAlternativeNames: options.subjectAlternativeNames,
    validation: aws_certificatemanager.CertificateValidation.fromDns(hostedZone),
  });

  return { hostedZone, certificate };
}
