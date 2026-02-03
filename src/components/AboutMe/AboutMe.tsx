import React from "react";
import { User } from "../../Models/UserModel";
import { useUser } from "../../UserContext";

export const AboutMe: React.FC = () => {
  const { user, loading, error } = useUser();

  if (loading) return <p> loading... </p>;
  if (error || !user) return <p>User not found or error loading.</p>;

  return (
    <div>
      <h1>
        {user.FirstName} {user.LastName}
      </h1>

      <p>
        <strong>Occupation:</strong> {user.Occupation}
      </p>
      <p>
        <strong>Tech Skills:</strong> {user.TechSet.join(", ")}
      </p>
    </div>
  );
};
