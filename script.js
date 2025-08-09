document.getElementById('year').textContent = new Date().getFullYear();


const items = document.querySelectorAll('.section, .project-card, .timeline-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.transition = 'all 600ms cubic-bezier(.2,.9,.2,1)';
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  })
}, {threshold:0.12});

items.forEach(it => {
  it.style.opacity = 0;
  it.style.transform = 'translateY(10px)';
  observer.observe(it);
});
function addMessage(text, sender) {
  const msgContainer = document.getElementById("chat-messages");
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  msgContainer.appendChild(msg);
  
  
  msgContainer.parentElement.scrollTop = msgContainer.parentElement.scrollHeight;
}
