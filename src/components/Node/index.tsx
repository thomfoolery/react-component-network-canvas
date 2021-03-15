import React from "react";

import styles from "./styles.module.css";

function Node(props) {
  const {
    node,
    position,
    isSelected,
    inputPorts,
    outputPorts,
    onMouseUp,
    onMouseDown,
    PortComponent,
  } = props;

  const style = {
    left: position.x,
    top: position.y,
  };

  const containerClassList = [styles.Node];

  if (isSelected) {
    containerClassList.push(styles.isSelected);
  }

  return (
    <div
      style={style}
      id={`Node-${node.id}`}
      className={containerClassList.join(" ")}
    >
      <div className={styles.NodeInputPorts}>
        {inputPorts.map((port) => (
          <PortComponent key={port.id} node={node} port={port} type="input" />
        ))}
      </div>
      <div
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        className={styles.NodeBody}
        data-testid={node.id}
      ></div>
      <div className={styles.NodeOutputPorts}>
        {outputPorts.map((port) => (
          <PortComponent key={port.id} node={node} port={port} type="output" />
        ))}
      </div>
    </div>
  );
}

export {Node};
