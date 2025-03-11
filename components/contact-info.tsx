export default function ContactInfo({ icon, title, content }) {
  return (
    <div className="flex">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="mt-1 text-gray-600">
          {content.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
