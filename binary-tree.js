'use strict';

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        var node = {
                data: data,
                left: null,
                right: null
            },

            current;

        if (this.root === null){
            this.root = node;
        } else {
            current = this.root;

            while(true){

                 if (data < current.data){

                    if (current.left === null){
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }

                } else if (data > current.data){

                    if (current.right === null){
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }       

                } else {
                    break;
                }
            }
        }
    }

    contains(data) {
        var found = false,
            current = this.root

        while(!found && current){

            if ( data < current.data){
                current = current.left;
            } else if (data > current.data){
                current = current.right;
            } else {
                found = true;
            }
        }
        return found;
    }

    traverse (process) {
        function inOrder(node){
            if (node){

                 if (node.left !== null){
                    inOrder(node.left);
                }            

                process.call(this, node);

                if (node.right !== null){
                    inOrder(node.right);
                }
            }
        }

        inOrder(this.root);
    }

    remove(data) {
    	 var found = false,
            parent = null,
            current = this.root,
            childCount,
            replacement,
            replacementParent;

        while(!found && current){

            if (data < current.data){
                parent = current;
                current = current.left;

            } else if (data > current.data){
                parent = current;
                current = current.right;

            } else {
                found = true;
            }
        }

        if (found){

            childCount = (current.left !== null ? 1 : 0) + 
                         (current.right !== null ? 1 : 0);

            if (current === this.root){
                switch(childCount){

                    case 0:
                        this.root = null;
                        break;

                    case 1:
                        this.root = (current.right === null ? 
                                      current.left : current.right);
                        break;

                    case 2:

                        replacement = this.root.left;

                        while (replacement.right !== null){
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        if (replacementParent !== null){

                            replacementParent.right = replacement.left;

                            replacement.right = this.root.right;
                            replacement.left = this.root.left;
                        } else {

                            replacement.right = this.root.right;
                        }

                        this.root = replacement;

                }        

            } else {

                switch (childCount){

                    case 0:

                        if (current.data < parent.data){
                            parent.left = null;

                        } else {
                            parent.right = null;
                        }
                        break;

                    case 1:

                        if (current.data < parent.data){
                            parent.left = (current.left === null ? 
                                           current.right : current.left);


                        } else {
                            parent.right = (current.left === null ? 
                                            current.right : current.left);
                        }
                        break;    

                    case 2:

                        replacement = current.left;
                        replacementParent = current;

                        while(replacement.right !== null){
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }

                        if (current !== replacementParent){
                            replacementParent.right = replacement.left;
							replacement.right = current.right;
							replacement.left = current.left;
                        }
						else{
							replacement.right = current.right;
						}                        

                        if (current.data < parent.data){
                            parent.left = replacement;
                        } else {
                            parent.right = replacement;
                        }          

                }

            }

        }

    }
    

    size() {
        var length = 0;

        this.traverse(function(node){
            length++;
        });

        return length;
    }

    isEmpty() {
        return this.root === null;
    }
}