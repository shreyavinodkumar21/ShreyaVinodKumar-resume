let resumeData = {};

async function loadResume() {
  try {
    const res = await fetch('resume.json');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    resumeData = await res.json();
    console.log('Resume data loaded successfully:', resumeData);
  } catch (error) {
    console.error('Error loading resume.json:', error);
  }
}

function getAnswer(question) {
  if (!resumeData || Object.keys(resumeData).length === 0) {
    return "Sorry, I'm still loading my resume data. Please try again in a moment.";
  }

  const q = question.toLowerCase();


  if (q.includes("name")) return `My name is ${resumeData.name}.`;
  if (q.includes("role")) return `I am an ${resumeData.role}.`;


  if (q.includes("cgpa")) return `My CGPA is ${resumeData.education.cgpa}.`;
  if (q.includes("college") || q.includes("university")) return `${resumeData.education.degree} at ${resumeData.education.college} (${resumeData.education.period})`;
  if (q.includes("education") || q.includes("degree")) return `${resumeData.education.degree} with CGPA ${resumeData.education.cgpa}`;


  if (q.includes("skill")) return `My skills include: ${resumeData.skills.join(", ")}.`;


  if (q.includes("project")) {
    let answers = resumeData.projects.map(p => `${p.title}: ${p.description}`).join("\n\n");
    return answers;
  }


  if (q.includes("experience") || q.includes("internship")) {
    return resumeData.experience.map(e => `${e.title} (${e.period}): ${e.summary}`).join("\n\n");
  }


  if (q.includes("contact") || q.includes("email")) return `You can reach me at ${resumeData.contact.email}.`;
  if (q.includes("linkedin")) return `Here's my LinkedIn: ${resumeData.contact.linkedin}`;
  if (q.includes("github")) return `Here's my GitHub: ${resumeData.contact.github}`;
  if (q.includes("phone") || q.includes("number")) return `My phone number is ${resumeData.contact.phone}`;

  if (q.includes("certification") || q.includes("course")) {
    return `I have completed: ${resumeData.certifications.join(", ")}`;
  }

  return "I don't have that information in my resume.";
}

function createChatWidget() {
 
  if (document.getElementById('chat-bubble')) {
    console.log('Chat widget already exists');
    return;
  }

  const widget = document.createElement("div");
  widget.id = "chat-widget";
  widget.innerHTML = `
    <div id="chat-bubble">💬</div>
    <div id="chat-box" style="display:none;">
      <div id="chat-messages"></div>
      <input type="text" id="chat-input" placeholder="Ask about me..." />
    </div>
  `;
  document.body.appendChild(widget);


  const chatBubble = document.getElementById("chat-bubble");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  if (chatBubble && chatBox) {
    chatBubble.onclick = () => {
      chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
    };
  }

  if (chatInput && chatMessages) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        const userMsg = e.target.value.trim();
        addMessage(userMsg, "user");
        const answer = getAnswer(userMsg);
        addMessage(answer, "bot");
        e.target.value = "";
      }
    });
  }


  setTimeout(() => {
    if (chatMessages) {
      addMessage("Hi! I'm Shreya's AI assistant. Ask me anything about her skills, projects, or experience!", "bot");
    }
  }, 1000);
}

function addMessage(text, sender) {
  const msgContainer = document.getElementById("chat-messages");
  if (!msgContainer) return;

  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  msgContainer.appendChild(msg);
  msgContainer.scrollTop = msgContainer.scrollHeight;
}


loadResume().then(() => {
  createChatWidget();
}).catch(error => {
  console.error('Failed to initialize chat widget:', error);
});
 function createChatWidget() {
  const widget = document.createElement("div");
  widget.innerHTML = `
    <div id="chat-bubble">💬</div>
    <div id="chat-box" style="display:none;">
      <div id="chat-header">
        <span>Shreya’s Resume Assistant</span>
        <button id="chat-close">&times;</button>
      </div>
      <div id="chat-messages"></div>
      <input type="text" id="chat-input" placeholder="Ask about me..." />
    </div>
  `;
  document.body.appendChild(widget);

  document.getElementById("chat-bubble").onclick = () => {
    document.getElementById("chat-box").style.display =
      document.getElementById("chat-box").style.display === "none" ? "flex" : "none";
  };

  document.getElementById("chat-close").onclick = () => {
    document.getElementById("chat-box").style.display = "none";
  };

  document.getElementById("chat-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const userMsg = e.target.value;
      addMessage(userMsg, "user");
      const answer = getAnswer(userMsg);
      addMessage(answer, "bot");
      e.target.value = "";
    }
  });
}
