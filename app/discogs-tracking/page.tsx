import DiscogsTracking from "@/app/utils/discogsTrackingClient"

export default async function DiscogsTrackingPage() {
  // Fetch data directly in a Server Component
  return (
    <div>
     <DiscogsTracking></DiscogsTracking>
    </div>
  );
}