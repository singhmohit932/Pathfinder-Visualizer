import React, {Component} from 'react';
import Node from './Node/Node';
import {Dijkstra} from '../Algorithms/Dijkstra';
import {DFS} from '../Algorithms/DFS';
import {BFS} from '../Algorithms/BFS';
import {AStar} from '../Algorithms/AStar';
import {BI_DirectionalBFS} from '../Algorithms/BI_DIRECTIONAL_SEARCH/BI-BFS';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  
  
  get_Nodes_In_Shortest_Path_Order() {
    const nodesInShortestPathOrder = [];
    const {grid} = this.state;
    let currentNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  visualizeAStar() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = AStar(grid, startNode, finishNode);
    console.log(visitedNodesInOrder.length);
    for(let i=0;i<visitedNodesInOrder.length;i++){
      console.log(visitedNodesInOrder[i]);
    }
    const nodesInShortestPathOrder = this.get_Nodes_In_Shortest_Path_Order();
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = this.get_Nodes_In_Shortest_Path_Order();
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }



  visualizeDFS(){

    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = DFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = this.get_Nodes_In_Shortest_Path_Order();
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);

  }

  visualizeBFS(){

    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode); 
    const nodesInShortestPathOrder = this.get_Nodes_In_Shortest_Path_Order();
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);

  }
  

  get_Nodes_In_Shortest_Path_Order_BI(){

  }



  visualizeBI_DIIRECTIONALBFS(){
    
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder= BI_DirectionalBFS(grid, startNode, finishNode);
    const visitedNodesInOrder1 = visitedNodesInOrder[0];
    const visitedNodesInOrder2 = visitedNodesInOrder[1];
    let n = visitedNodesInOrder1.length;
    let Middle_Node1 = visitedNodesInOrder1[n-1];
    if(n>1)Middle_Node1 = visitedNodesInOrder1[n-2];
    let Middle_Node2 = visitedNodesInOrder2[n-1];
    if(n>1)Middle_Node2 = visitedNodesInOrder2[n-2];
    const nodesInShortestPathOrder1 = this.get_Nodes_In_Shortest_Path_Order_BI(Middle_Node1.row,Middle_Node1.col,);
    const nodesInShortestPathOrder2 = this.get_Nodes_In_Shortest_Path_Order_BI(Middle_Node2);
    this.animate(visitedNodesInOrder1, nodesInShortestPathOrder1);
    this.animate(visitedNodesInOrder2, nodesInShortestPathOrder2);
    

  }


  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>  
        
        

        <button onClick={() => this.visualizeBI_DIIRECTIONALBFS()}>
          Visualize BI_DIRECTIONAL_SEARCH Algorithm
        </button>
        <button onClick={() => this.visualizeAStar()}>
          Visualize Astar Algorithm
        </button>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>

        <button onClick={() => this.visualizeDFS()}>
          Visualize DFS
        </button>

        <button onClick={() => this.visualizeBFS()}>
          Visualize BFS
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    distanceToFinishNode:
        Math.abs(FINISH_NODE_ROW - row) +
        Math.abs(FINISH_NODE_COL - col),
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};