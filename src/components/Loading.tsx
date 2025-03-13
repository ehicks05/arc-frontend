import { CgSpinner } from 'react-icons/cg';
import { TbMoodSad } from 'react-icons/tb';
import { Card } from '.';

interface Props {
  error?: unknown;
}
const Loading = ({ error }: Props) => {
  if (error) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error, null, 2);
    return (
      <Card>
        <div className="text-center text-3xl">Something went wrong.</div>
        <div className="text-xs">
          <pre className="whitespace-pre-wrap">{message}</pre>
        </div>
        <TbMoodSad size={128} />
      </Card>
    );
  }

  return (
    <div className="flex items-center justify-center flex-grow">
      <CgSpinner size={96} className="animate-spin text-caribbean-green-600" />
    </div>
  );
};

export default Loading;
