import GradientBackground from './components/GradientBackground';
import WrappedWriteup from './components/WrappedWriteup';
import SpotifyWrappedModel from "../models/SpotifyWrappedModel";
import retrieveRecords from "@/app/utils/retrieveRecords";


export default async function WrappedPage() {
  const records = (await getRecords()).releases
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <WrappedWriteup data={records} />
    </div>
  );
}

async function getRecords() {
    //try catch if no user and default to blank map.
      const response = await retrieveRecords();
      if(response !== null)
      {
        return response;
      }
      else
      {
        throw new Error("No records found");
      }
  
    }
