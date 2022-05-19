import { useStarknet } from "@starknet-react/core";
import { ReactNode } from "react";
import ButtonConnect from "src/components/ButtonConnect";
import { minimizeAddress } from "src/utils/web3";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { account } = useStarknet();

  return (
    <div className="h-screen flex flex-col">
      <div className="max-w-screen-lg w-full mx-auto flex flex-row items-center h-[124px]">
        <div className="text-4xl font-bold flex-grow">Starkonquest</div>
        <div className="">{renderAccount()}</div>
      </div>
      {children}
    </div>
  );

  function renderAccount() {
    if (!account) {
      return <ButtonConnect />;
    }

    return (
      <div>
        <span>Address :</span>
        {minimizeAddress(account)}
      </div>
    );
  }
}
