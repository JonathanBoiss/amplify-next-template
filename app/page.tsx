"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from '@aws-amplify/ui-react';
import { StorageBrowser } from '../components/StorageBrowser';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>

            <video width="320" height="240" controls preload="none">
              <source src="https://amplify-d1sexobngiv82h-main-bra-mys3bucketad696188-ijyrqxd0eqyb.s3.us-east-2.amazonaws.com/private/us-east-2%3A79b54399-9e4d-c2bb-f076-00154e51b719/slice+(online-video-cutter.com)+(1).mp4" type="video/mp4" />
              <track
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              
            </video>

          {/* StorageBrowser Component */}
          <h2>Your Files</h2>
          <StorageBrowser />

        </main>
      )}
    </Authenticator>
  );
}

