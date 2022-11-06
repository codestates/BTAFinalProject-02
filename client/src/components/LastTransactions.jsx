import React from "react";
import DashBoardCard from "./DashBoardCard";

const createCellData = (txid, date, sender, recipient, amount, fee) => {
  return { id: txid, date, sender, recipient, amount, fee };
};

const rows = [
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
  // createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "lskv7bssowcksr5d39y2av5tmt2phpzkkh82xvr6f", "8.6436 Ⱡ", "0.00143 Ⱡ"),
];

const LastTransactions = () => {
  return <DashBoardCard title="최근 생성된 트랜잭션" rows={rows} />;
};

export default LastTransactions;
