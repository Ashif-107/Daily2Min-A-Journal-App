
import Homenav from "../ui/homepage/Homenav"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#1A1A1A]">
            <div className='mb-10 bg-[#282828]'>
                <Homenav />
            </div>
            <div>

                {children}

            </div>
        </div>
    )
}