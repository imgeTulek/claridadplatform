
interface GeneratedSqlExplanationProps {
  explanation: string;
}

export const GeneratedSqlExplanation = ({ explanation }: GeneratedSqlExplanationProps) => {
  if (!explanation) return null;
  
  return (
    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
      <p className="text-xs text-blue-700 dark:text-blue-300">{explanation}</p>
    </div>
  );
};
