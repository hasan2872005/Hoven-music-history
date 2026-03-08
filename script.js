document.addEventListener('DOMContentLoaded', () => {
    // --- Fade-in Animation Logic ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });

    // --- Chatbot Logic ---
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        if (chatbotContainer.classList.contains('chatbot-collapsed')) {
            chatbotContainer.classList.remove('chatbot-collapsed');
            chatbotContainer.classList.add('chatbot-expanded');
            chatbotIcon.classList.remove('fa-chevron-up');
            chatbotIcon.classList.add('fa-chevron-down');
        } else {
            chatbotContainer.classList.remove('chatbot-expanded');
            chatbotContainer.classList.add('chatbot-collapsed');
            chatbotIcon.classList.remove('fa-chevron-down');
            chatbotIcon.classList.add('fa-chevron-up');
        }
    });

    // Simple Knowledge Base
    const knowledgeBase = [
        {
            keywords: ['who', 'about', 'story', 'background', 'hoven'],
            response: "I'm Hoven, a music producer and composer obsessed with cinematic storytelling. I've been crafting music for 5 years, dreaming of scoring films, games, and visual projects."
        },
        {
            keywords: ['style', 'genre', 'type', 'kind of music'],
            response: "My style blends orchestral emotion, modern textures, and raw energy to create cinematic storytelling through sound."
        },
        {
            keywords: ['release', 'latest', 'new', 'recent', 'track', 'project', 'album'],
            response: "My latest release is 'No Tomorrow', an electronic track. I also have cinematic albums like 'Days Gone' and 'Chernobyl', and epic pieces like 'Journey'."
        },
        {
            keywords: ['contact', 'email', 'hire', 'work', 'upwork'],
            response: "You can reach me via email at aboelsoudhasan6@gmail.com or find me on Upwork. Check the links in the footer!"
        },
        {
            keywords: ['social', 'instagram', 'spotify', 'youtube', 'linkedin'],
            response: "You can find all my social links, including Spotify, YouTube, Instagram, and LinkedIn, in the footer of this page."
        },
        {
            keywords: ['hello', 'hi', 'hey'],
            response: "Hello! How can I help you learn more about Hoven's music today?"
        }
    ];

    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        
        for (const item of knowledgeBase) {
            if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
                return item.response;
            }
        }
        
        return "I'm not quite sure about that. I'm an AI assistant focused on Hoven's cinematic music career. Try asking about his style, latest releases, or background!";
    }

    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, true);
            chatInput.value = '';
            
            // Simulate slight delay for bot response
            setTimeout(() => {
                const response = getBotResponse(text);
                addMessage(response, false);
            }, 600);
        }
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
