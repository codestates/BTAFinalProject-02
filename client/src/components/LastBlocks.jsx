import React from 'react';
import DashBoardCard from './DashBoardCard';

const createCellData = (blockid, date, generatedby) => {
  return { id: blockid, date, generatedby };
};
  
const rows = [
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
  // createCellData("af84f7677c83fb88d67e02bd0fbfaa66e66187ee81fd4b213cb3c73af8458992", 16, "e729d099966ca7efd78628938aca5f848119a6e42a2bc0776a915d25227fb4f6"),
];

const LastBlocks = () => {
  return <DashBoardCard title="최근 생성된 블록" rows={rows} />;
};

export default LastBlocks;
