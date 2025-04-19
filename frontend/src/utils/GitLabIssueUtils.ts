export const createGitLabIssue = async (title: string, body: string) => {
  const formattedBody = `\`\`\`xml\n${body}\n\`\`\``;

  try {
    const response = await fetch('https://git.kpi.fei.tuke.sk/api/v4/projects/68189/issues', {
      method: 'POST',
      headers: {
        'PRIVATE-TOKEN': import.meta.env.VITE_GITLAB_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `${title}`,
        description: `${formattedBody}`,
        assignee_ids: [7927],
      }),
    });

    if (!response.ok) {
      console.error(`Failed to create issue: ${response.status} - ${response.statusText}`);
      const err = await response.text();
      console.error(err);
      return;
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Failed to create issue:', error);
  }
};
