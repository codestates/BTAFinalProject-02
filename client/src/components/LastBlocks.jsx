import React from 'react';
import DashBoardCard from './DashBoardCard';

const createCellData = (txid, date, generatedby, amount) => {
  return { txid, date, generatedby, amount };
};
  
const rows = [
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
  // createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6", "1Ⱡ"),
];

const LastBlocks = () => {
  return <DashBoardCard title="Last Blocks" rows={rows} />;
};

export default LastBlocks;
