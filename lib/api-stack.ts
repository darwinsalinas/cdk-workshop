import * as cdk from 'aws-cdk-lib';
import * as apiGw from "aws-cdk-lib/aws-apigateway";

import { StackBasicProps, ApiStackProps } from '../interfaces/index';
import { getCdkPropsFromCustomProps, getResourceNameWithPrefix } from '../util/index';
import { Construct } from 'constructs';

export class ApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, getCdkPropsFromCustomProps(props));

        const lambdaStack = props.lambdaStack;

        const api = new apiGw.RestApi(this, "Api", {
            restApiName: getResourceNameWithPrefix(`api-${props.env}`),
            deployOptions: {
                stageName: props.env,
            }
        });

        const playersResource = api.root.addResource("players");
        playersResource.addMethod("POST", new apiGw.LambdaIntegration(lambdaStack.players.create));
        playersResource.addMethod("GET", new apiGw.LambdaIntegration(lambdaStack.players.getAll));

        // exportar recursos para poderlos utilizar desde otras aplicaciones
        new cdk.CfnOutput(this, "UotputApiEndpoint", {
            exportName: getResourceNameWithPrefix(`api-url-${props.env}`),
            value: api.url,
        })
    }
}