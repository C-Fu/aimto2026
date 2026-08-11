/**
 * ntfy publish/subscribe client (send half).
 * Pure network module — no DOM access.
 */

/**
 * Publishes a message to an ntfy topic.
 * @param {Object} opts - Publish options.
 * @param {string} opts.topic - ntfy topic name (no scheme/leading "ntfy.sh/").
 * @param {string} opts.message - Message body text.
 * @param {string} [opts.title] - Notification title (X-Title header). Defaults to topic.
 * @param {string} [opts.priority] - One of "min"|"low"|"default"|"high"|"urgent"|"max" (X-Priority). Defaults to "default".
 * @param {string} [opts.tags] - Comma-separated ntfy tags (X-Tags), e.g. "loudspeaker".
 * @returns {Promise<boolean>} True when ntfy accepted the publish (res.ok).
 */
export async function sendAlert({ topic, message, title, priority = "default", tags }) {
  const attempts = 3;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const headers = {};
      if (title) headers.Title = title;
      if (priority) headers.Priority = priority;
      if (tags) headers.Tags = tags;

      const res = await fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        headers,
        body: message,
      });

      if (res.ok) return true;
      console.error(`ntfy send failed (attempt ${attempt}/${attempts}): HTTP ${res.status}`);
    } catch (err) {
      console.error(`ntfy send failed (attempt ${attempt}/${attempts}):`, err);
    }

    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return false;
}

/**
 * Subscribes to an ntfy topic via Server-Sent Events and invokes the callback
 * for each incoming message. Returns a function that closes the subscription.
 * @param {string} topic - ntfy topic name (no scheme/leading "ntfy.sh/").
 * @param {function({title: string, message: string, priority: string}): void} onMessage - Called per message.
 * @returns {() => void} Unsubscribe function.
 */
export function subscribeTopic(topic, onMessage) {
  const source = new EventSource(`https://ntfy.sh/${topic}/sse`);
  source.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.event === "message") {
        onMessage({
          title: data.title || topic,
          message: data.message || "",
          priority: data.priority || "default",
        });
      }
    } catch (err) {
      console.error("ntfy subscribe parse failed:", err);
    }
  });
  source.onerror = () => {
    // EventSource auto-reconnects; log quietly.
    console.error("ntfy subscription error — reconnecting…");
  };
  return () => source.close();
}
