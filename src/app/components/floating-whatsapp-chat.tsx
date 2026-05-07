const whatsappHref =
  "https://wa.me/17708787224?text=Hi%2C%20I%27m%20interested%20in%20JW%20Luxury%20Estate%20housing%20options.";

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.42rem] w-[1.42rem] fill-none stroke-current stroke-[1.95]"
    >
      <path
        d="M7.2 17.4 4.8 19l.56-3.08A7.46 7.46 0 0 1 4.5 12c0-4.14 3.47-7.5 7.75-7.5S20 7.86 20 12s-3.47 7.5-7.75 7.5a7.98 7.98 0 0 1-5.05-1.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 10.25h6" strokeLinecap="round" />
      <path d="M9 13.25h4.25" strokeLinecap="round" />
    </svg>
  );
}

export default function FloatingWhatsappChat() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with JW Luxury Estate on WhatsApp"
      className="lux-float-chat"
    >
      <span className="lux-float-chat-icon">
        <ChatIcon />
      </span>
    </a>
  );
}
