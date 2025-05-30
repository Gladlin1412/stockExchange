import SentimentDisplay from '../../components/SentimentDisplay';

export default function SentimentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sentiment Analysis</h1>
      <SentimentDisplay />
    </div>
  );
}