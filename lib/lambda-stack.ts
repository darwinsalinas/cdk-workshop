import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { LambdaStackProps } from '../interfaces/index';
import { getCdkPropsFromCustomProps, getResourceNameWithPrefix } from '../util/index';
import { Construct } from 'constructs';

export class LambdaStack extends cdk.Stack {
    // public readonly createPlayer: lambda.Function;
    public readonly players: any = {};

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, getCdkPropsFromCustomProps(props));

        const dynamoStack = props.dynamoStack;

        const playersFunctions = [
            {
                id: "CreatePlayer",
                name: "create-player",
                action: "create",
                srcDir: "players",
            },
            {
                id: "GetAllPlayers",
                name: "get-all-players",
                action: "getAll",
                srcDir: "players",
            }
        ];

        for (const playerFunction of playersFunctions) {
            console.log(playerFunction);

            const functionObj = new lambda.Function(this, playerFunction.id, {
                code: lambda.Code.fromAsset(`lambdas/${playerFunction.srcDir}`),
                handler: `${playerFunction.name}.handler`,
                runtime: lambda.Runtime.NODEJS_16_X,
                functionName: getResourceNameWithPrefix(`${playerFunction.name}-${props.env}`),
                environment: {
                    // PLAYERS_TABLE: cdk.Fn.importValue(getResourceNameWithPrefix(`players-table-name-${props.env}`)),
                    PLAYERS_TABLE: dynamoStack.playersTable.tableName,
                }
            });

            dynamoStack.playersTable.grantFullAccess(functionObj);
            this.players[playerFunction.action] = functionObj;
        }

        // this.getAllPlayers = new lambda.Function(this, 'GetAllPlayers', {});
    }
}