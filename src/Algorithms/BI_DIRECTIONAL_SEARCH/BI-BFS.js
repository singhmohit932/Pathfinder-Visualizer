

export function BI_DirectionalBFS(grid,start,end){
    
    for (let i=0;i<grid.length;i++)
      for (let j=0;j<grid[0].length;j++)
        grid[i][j].distance=0;
    
    start.distance++;
    end.distance+=2;
    const visitedNodesInOrder1 = [];
    const visitedNodesInOrder2 = [];
    visitedNodesInOrder1.push(start);
    visitedNodesInOrder2.push(end);

    let nextNodesStack = [start,end];
    while (nextNodesStack.length) {
      const currentNode = nextNodesStack.shift();
      if (currentNode.distance === 3) {
        // return {visitedNodesInOrder1,visitedNodesInOrder2};
        const visitedNodesInOrder = [visitedNodesInOrder1, visitedNodesInOrder2];
        return visitedNodesInOrder;
        
      }
  
      if (
        !currentNode.isWall &&
        (currentNode.isStart || currentNode.distance !== 3)
      ) {
        currentNode.isVisited = true;
        const {col, row} = currentNode;
        let nextNode;
        if (row > 0) {
          nextNode = grid[row - 1][col];
          if (!(nextNode.distance===currentNode.distance)) {
            if(currentNode.distance===1)visitedNodesInOrder1.push(currentNode);
            else visitedNodesInOrder2.push(currentNode);
            nextNode.previousNode = currentNode;
            nextNode.distance+=currentNode.distance;
            nextNodesStack.push(nextNode);
          }
        }
        if (row < grid.length - 1) {
          nextNode = grid[row + 1][col];
          if (!(nextNode.distance===currentNode.distance)) {
            if(currentNode.distance===1)visitedNodesInOrder1.push(currentNode);
            else visitedNodesInOrder2.push(currentNode);
            nextNode.previousNode = currentNode;
            nextNode.distance+=currentNode.distance;
            nextNodesStack.push(nextNode);
          }
        }
        if (col > 0) {
          nextNode = grid[row][col - 1];
          if (!(nextNode.distance===currentNode.distance)) {
            if(currentNode.distance===1)visitedNodesInOrder1.push(currentNode);
            else visitedNodesInOrder2.push(currentNode);
            nextNode.previousNode = currentNode;
            nextNode.distance+=currentNode.distance;
            nextNodesStack.push(nextNode);
          }
        }
        if (col < grid[0].length - 1) {
          nextNode = grid[row][col + 1];
          if (!(nextNode.distance===currentNode.distance)) {
            if(currentNode.distance===1)visitedNodesInOrder1.push(currentNode);
            else visitedNodesInOrder2.push(currentNode);
            nextNode.previousNode = currentNode;
            nextNode.distance+=currentNode.distance;
            nextNodesStack.push(nextNode);
          }
        }
      }
    }



};



