import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamoDB from 'aws-cdk-lib/aws-dynamodb';
import { StackBasicProps } from '../interfaces/index';
import { getCdkPropsFromCustomProps, getResourceNameWithPrefix } from '../util';

export class DynamoStack extends cdk.Stack {
  public readonly playersTable: dynamoDB.Table;
  
  constructor(scope: Construct, id: string, props: StackBasicProps) {
    super(scope, id, getCdkPropsFromCustomProps(props));

    this.playersTable = new dynamoDB.Table(this, 'PlayersTable', {
      partitionKey: {
        name: 'id',
        type: dynamoDB.AttributeType.STRING,
      },
      tableName: getResourceNameWithPrefix(`players-${props.env}`),
    });

    // new cdk.CfnOutput(this, "OutputTableName", {
    //   exportName: getResourceNameWithPrefix(`players-table-name-${props.env}`),
    //   value: playersTable.tableName,
    // });
  }
}
