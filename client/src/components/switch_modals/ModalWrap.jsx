import React from "react";

export default function ModalWrap (props) {
  return (props.show) ? (
    <>{props.children}</>
  ) : (null);
}