import Link from "next/link";
import Image from "next/image";
import logo from "../images/whiteDASHH.png";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 py-16 md:px-8 xl:h-20 xl:flex-row xl:justify-between xl:py-0 bg-black text-zinc-100">
      <div className="xl:flex-1">
        <Image src={logo} alt="DASHH" width={80} height={25} className="text-dark-90" />
      </div>
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-6 px-5">
        <div className="flex items-center">
          <Link href="https://twitter.com/dashh_media" target="_blank" rel="noreferrer">
            <div className="flex flex-row items-center justify-center gap-2 text-button font-thin transition-colors duration-200 ease-in-out motion-reduce:transition-none text-dark-90 hover:text-dark-80">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="x-twitter" className="svg-inline--fa fa-x-twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
              Follow us
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="https://twitter.com/dashh_media" target="_blank" rel="noreferrer">
            <div className="flex flex-row items-center justify-center gap-2 text-button font-thin transition-colors duration-200 ease-in-out motion-reduce:transition-none text-dark-90 hover:text-dark-80">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="medium" className="svg-inline--fa fa-medium" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20"><path fill="currentColor" d="M180.5,74.262C80.813,74.262,0,155.633,0,256S80.819,437.738,180.5,437.738,361,356.373,361,256,280.191,74.262,180.5,74.262Zm288.25,10.646c-49.845,0-90.245,76.619-90.245,171.095s40.406,171.1,90.251,171.1,90.251-76.619,90.251-171.1H559C559,161.5,518.6,84.908,468.752,84.908Zm139.506,17.821c-17.526,0-31.735,68.628-31.735,153.274s14.2,153.274,31.735,153.274S640,340.631,640,256C640,171.351,625.785,102.729,608.258,102.729Z"></path></svg>
              Read our Blog
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="https://discord.gg/gBbheysT" target="_blank" rel="noreferrer">
            <div className="flex flex-row items-center justify-center gap-2 text-button font-thin transition-colors duration-200 ease-in-out motion-reduce:transition-none text-dark-90 hover:text-dark-80">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="discord" className="svg-inline--fa fa-discord" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20"><path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg>
              Join the conversation
            </div>
          </Link>
        </div>
      </nav>
      <nav className="flex flex-nowrap gap-6 xl:flex-1 xl:justify-end">
        <div className="flex items-center">
          <Link href="#" target="_blank">
            <div className="flex flex-row items-center justify-center gap-2 text-button font-thin transition-colors duration-200 ease-in-out motion-reduce:transition-none text-dark-70 hover:text-dark-80">
              Privacy Policy
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="#" target="_blank">
            <div className="flex flex-row items-center justify-center gap-2 text-button font-thin transition-colors duration-200 ease-in-out motion-reduce:transition-none text-dark-70 hover:text-dark-80">
              Terms of Service
            </div>
          </Link>
        </div>
      </nav>
    </footer>
  );
}