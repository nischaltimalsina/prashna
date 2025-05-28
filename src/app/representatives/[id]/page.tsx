import RepresentativeProfile from "@/components/screens/representative/profile";



export default async function RepresentativeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return (
    <RepresentativeProfile id={id}/>
  );
}
