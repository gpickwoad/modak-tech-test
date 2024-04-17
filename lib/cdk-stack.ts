import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambdaNodejs from '@aws-cdk/aws-lambda-nodejs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function Construct
    const goLambda = new lambda.Function(this, 'GoLambda', {
      runtime: lambda.Runtime.GO_1_X,
      handler: 'main',
      code: lambda.Code.fromAsset('go-code'),
    });

    // API Gateway Construct
    const api = new apigateway.RestApi(this, 'GoLambdaAPI', {
      restApiName: 'GO Lambda Service',
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(goLambda);

    api.root.addMethod('GET', lambdaIntegration);
  }
}
