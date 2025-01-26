import Creatorpage from "./creatorpage";
export const dynamic = 'force-dynamic'
export default async function Component() {
    return (
      <div className="mt-20 text-white p-4 sm:p-6 lg:p-8">
        <div className="flex gap-6 ">
          <Creatorpage  />
        </div>
      </div>
    );
}