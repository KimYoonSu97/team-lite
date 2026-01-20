import React from "react";
import TeamHeader from "../../components/TeamHeader";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getTeamDetail } from "../../api";

const AddProject = () => {
  const { teamId } = useParams();
  const teamDetail = useQuery({
    queryKey: ["teamDetail", teamId],
    queryFn: () => getTeamDetail(teamId!),
  });
  if (teamDetail.isLoading || teamDetail.isError) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TeamHeader team={teamDetail.data!}></TeamHeader>
      <div>AddProject</div>
    </div>
  );
};

export default AddProject;
