import React, { useState, useEffect } from "react";
import { User } from "../../Models/UserModel";
import { AccountService } from "../../Account/AccountService";

export const AboutMe: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    AccountService.getProfile()
      .then((data) => setUser(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

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
