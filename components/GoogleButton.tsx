import React, { MouseEventHandler } from "react";
import Image from "next/image";

type GoogleButtonProps = {
  title: string;
  onClick?: MouseEventHandler;
};

export default function GoogleButton(props: GoogleButtonProps) {
  return (
    <button className="btn-white" onClick={props?.onClick ?? undefined}>
      <Image
        width={30}
        height={30}
        src={"/icons/google.png"}
        alt="google logo"
      />
      {props.title}
    </button>
  );
}
