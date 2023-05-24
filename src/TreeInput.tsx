import * as React from "react";
import { BinTreeNode } from "./TreeNode";

export interface TreeInputProps {
    onChange: (newTreeNode: BinTreeNode) => void
}
interface TreeInputState {
    treeText: string
}

export class TreeInput extends React.Component<TreeInputProps, TreeInputState>{
    constructor(props: TreeInputProps) {
        super(props);
        this.state = {
            treeText: ""
        }
    }

    /**
     * Converts array format binary tree notation to BinTreeNode data structure
     * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
     * @returns TreeNode format
     * */
    parseArrayToTree(arr: any[]): BinTreeNode {
        let root  = new BinTreeNode(arr[0], arr[1], arr[2]);;
        root.id = arr[0] || null;
        if(arr[1] !== undefined){
            if(arr[1] == null){
                root.left = null
            } else {
            root.left = this.parseArrayToTree(arr[1])  

            }
        }  
        if(arr[2] !== undefined){
            if(arr[2] == null){
                root.right = null
            } else {
            root.right = this.parseArrayToTree(arr[2])
            }
        } 
        return root
    }

    convert = () => {
        // After you implement parseArrayToTree above, uncomment the below code
        let treeArrayFormat: any[] = JSON.parse(this.state.treeText);
        this.props.onChange(this.parseArrayToTree(treeArrayFormat));

        // After you implement parseArrayToTree above, comment the below code
        // let treeNodeFormat: BinTreeNode = JSON.parse(this.state.treeText);
        // this.props.onChange(treeNodeFormat);
    }

    render() {
        return (
            <div>
                <button onClick={this.convert}>Process</button><br />
                <textarea rows={5} cols={120} onChange={(ev) => {
                    this.setState({
                        treeText: ev.target.value
                    })
                }}></textarea>
            </div>
        )
    }
}