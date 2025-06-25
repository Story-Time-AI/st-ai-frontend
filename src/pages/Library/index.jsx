import React from "react";
import Header from "../../components/Header";
import StoryLibrary from "../../components/Library/StoryLibrary";
import useFetchStories from "../../hooks/useFetchStories";

const Index = () => {
  const token = localStorage.getItem("token") || "";
  const { apiData, loading, error,refetchStories } = useFetchStories(token);

  return (
    <div className="max-w-screen">
      {/* Header */}
      <Header title="Stories Library" />
      
      {/* Pass the apiData directly to StoryLibrary */}
      <StoryLibrary 
        apiData={apiData}
        isLoading={loading}
        error={error}
        refetchStories={refetchStories}
      />
    </div>
  );
};

export default Index;