import { Sprout, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';

const VisaIcon = () => (
    <svg role="img" aria-labelledby="visa-title" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="visa-title">Visa</title>
        <rect width="38" height="24" rx="4" fill="white"/>
        <path d="M12.193 6.932L10.21 16.892H8.314L10.292 6.932H12.193ZM18.787 6.932L20.82 14.15L20.91 14.15L22.951 6.932H24.58L21.724 16.892H19.993L17.131 6.932H18.787ZM28.618 10.394C28.618 9.389 29.215 8.792 30.136 8.792C30.292 8.792 30.706 8.825 30.994 8.942L31.252 7.154C30.85 7.028 30.346 6.965 29.749 6.965C27.970 6.965 26.797 8.018 26.797 9.539C26.797 10.742 27.427 11.45 28.168 11.837C28.909 12.239 29.296 12.527 29.296 12.962C29.296 13.592 28.684 13.847 27.988 13.847C27.067 13.847 26.68 13.592 26.472 13.499L26.215 15.221C26.584 15.347 27.344 15.440 28.081 15.440C30.031 15.440 31.138 14.354 31.138 12.782C31.138 11.399 30.121 10.658 28.618 10.394ZM7.925 16.892L6 6.932H7.957L8.878 12.17L9.043 12.17C9.364 10.433 10.157 9.572 11.045 9.572C11.168 9.572 11.272 9.587 11.371 9.61L10.759 12.821C10.424 12.728 10.096 12.682 9.808 12.682C9.115 12.682 8.713 13.069 8.524 13.847L7.925 16.892Z" fill="#1434CB"/>
    </svg>
)

const GPayIcon = () => (
    <svg role="img" aria-labelledby="gpay-title" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="gpay-title">Google Pay</title>
        <rect width="38" height="24" rx="4" fill="white"/>
        <path d="M12.0199 10.6954V12.3384H14.8389C14.7109 13.2504 13.8399 14.5494 12.0199 14.5494C10.1589 14.5494 8.64389 12.9854 8.64389 11.0184C8.64389 9.05143 10.1589 7.48743 12.0199 7.48743C12.9319 7.48743 13.6219 7.85743 13.9489 8.16343L15.2269 6.92643C14.3559 6.13143 13.2929 5.64243 12.0199 5.64243C9.42989 5.64243 7.35589 7.61043 7.35589 10.0914V11.9454C7.35589 14.4264 9.42989 16.3944 12.0199 16.3944C14.6509 16.3944 16.4839 14.5614 16.4839 12.1134C16.4839 11.6664 16.4429 11.1774 16.3609 10.6954H12.0199Z" fill="#5F6368"/>
        <path d="M18.8053 10.8248H17.4373V16.2658H18.8053V10.8248Z" fill="#5F6368"/>
        <path d="M23.1118 10.686C22.2198 10.686 21.5298 11.292 21.5298 12.216C21.5298 13.128 22.2078 13.746 23.1118 13.746C23.5178 13.746 23.8568 13.608 24.1008 13.386L24.1128 13.494V14.694C24.1128 15.3 23.6768 15.684 23.1118 15.684C22.6478 15.684 22.2908 15.42 22.1448 15.09L20.8908 15.6C21.2598 16.32 22.0428 16.998 23.1118 16.998C24.6378 16.998 25.4778 15.936 25.4778 14.598V10.83H25.3458L24.1458 11.13C23.8568 10.836 23.5058 10.686 23.1118 10.686ZM23.1358 12.93C22.7518 12.93 22.4778 12.636 22.4778 12.216C22.4778 11.796 22.7518 11.502 23.1358 11.502C23.5178 11.502 23.7918 11.796 23.7918 12.216C23.7918 12.636 23.5178 12.93 23.1358 12.93Z" fill="#5F6368"/>
        <path d="M29.5699 10.8248H28.1899L26.8339 14.0708L26.8219 14.0708L28.1779 16.2658H29.6299L28.2739 14.0708L29.5699 10.8248Z" fill="#5F6368"/>
        <path d="M29.9868 14.0708L28.6308 10.8248H27.2108L28.5668 14.0708L27.2108 17.3168H28.6308L29.9868 14.0708Z" fill="#5F6368"/>
    </svg>
)

const PayPalIcon = () => (
    <svg role="img" aria-labelledby="paypal-title" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="paypal-title">PayPal</title>
        <rect width="38" height="24" rx="4" fill="white"/>
        <path d="M12.046 12.1868C12.316 11.4528 12.871 10.8128 13.564 10.4588C14.269 10.0928 15.064 10.0148 15.823 10.2458C16.444 10.4348 16.945 10.8428 17.215 11.4008C17.485 11.9708 17.509 12.6008 17.284 13.1888C17.071 13.7288 16.645 14.1728 16.108 14.4188C15.619 14.6348 15.064 14.6708 14.545 14.5208C13.684 14.2808 13.063 13.6028 12.871 12.7688L12.046 12.1868ZM14.131 11.8928C13.885 12.2168 13.849 12.6248 14.029 12.9728C14.209 13.3088 14.563 13.5188 14.941 13.5188C15.586 13.5188 16.105 13.0088 16.105 12.3668C16.105 11.7248 15.586 11.2148 14.941 11.2148C14.647 11.2148 14.365 11.3108 14.155 11.5028L14.131 11.8928Z" fill="#253B80"/>
        <path d="M18.8954 12.1868C19.1654 11.4528 19.7204 10.8128 20.4134 10.4588C21.1184 10.0928 21.9134 10.0148 22.6724 10.2458C23.2934 10.4348 23.7944 10.8428 24.0644 11.4008C24.3344 11.9708 24.3584 12.6008 24.1334 13.1888C23.9204 13.7288 23.4944 14.1728 22.9574 14.4188C22.4684 14.6348 21.9134 14.6708 21.3944 14.5208C20.5334 14.2808 19.9124 13.6028 19.7204 12.7688L18.8954 12.1868ZM20.9804 11.8928C20.7344 12.2168 20.6984 12.6248 20.8784 12.9728C21.0584 13.3088 21.4124 13.5188 21.7904 13.5188C22.4354 13.5188 22.9544 13.0088 22.9544 12.3668C22.9544 11.7248 22.4354 11.2148 21.7904 11.2148C21.4964 11.2148 21.2144 11.3108 21.0044 11.5028L20.9804 11.8928Z" fill="#253B80"/>
        <path d="M19.388 9.00002C19.943 8.65802 20.623 8.52602 21.289 8.64002C20.911 8.08802 20.32 7.74602 19.642 7.74602C18.496 7.74602 17.584 8.62202 17.584 9.72602C17.584 10.02602 17.656 10.31402 17.788 10.57202C17.932 10.27802 18.238 10.03202 18.592 9.87002L19.388 9.00002Z" fill="#179BD7"/>
        <path d="M26.2429 9.00002C26.7979 8.65802 27.4779 8.52602 28.1439 8.64002C27.7659 8.08802 27.1749 7.74602 26.4969 7.74602C25.3509 7.74602 24.4389 8.62202 24.4389 9.72602C24.4389 10.02602 24.5109 10.31402 24.6429 10.57202C24.7869 10.27802 25.0929 10.03202 25.4469 9.87002L26.2429 9.00002Z" fill="#179BD7"/>
        <path d="M11.457 9.00002C12.012 8.65802 12.692 8.52602 13.358 8.64002C12.98 8.08802 12.389 7.74602 11.711 7.74602C10.565 7.74602 9.653 8.62202 9.653 9.72602C9.653 10.02602 9.725 10.31402 9.857 10.57202C10.001 10.27802 10.307 10.03202 10.661 9.87002L11.457 9.00002Z" fill="#179BD7"/>
        <path d="M12.8291 12.7688C13.0211 13.6028 13.6421 14.2808 14.5031 14.5208C15.0221 14.6708 15.5771 14.6348 16.0661 14.4188C15.7091 15.0908 15.0431 15.4868 14.2751 15.4868C13.0631 15.4868 12.0911 14.5688 12.0911 13.3808C12.0911 13.1408 12.1331 12.9068 12.2051 12.6908C12.3611 12.8588 12.5711 12.9608 12.8291 12.7688Z" fill="#179BD7"/>
        <path d="M19.7226 12.7688C19.9146 13.6028 20.5356 14.2808 21.3966 14.5208C21.9156 14.6708 22.4706 14.6348 22.9596 14.4188C22.6026 15.0908 21.9366 15.4868 21.1686 15.4868C19.9566 15.4868 18.9846 14.5688 18.9846 13.3808C18.9846 13.1408 19.0266 12.9068 19.0986 12.6908C19.2546 12.8588 19.4646 12.9608 19.7226 12.7688Z" fill="#179BD7"/>
    </svg>
)

const ApplePayIcon = () => (
    <svg role="img" aria-labelledby="applepay-title" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="applepay-title">Apple Pay</title>
        <rect width="38" height="24" rx="4" fill="white"/>
        <path d="M16.9405 10.36C17.0015 9.016 18.0695 8.164 19.1615 8.152C20.2655 8.152 21.2195 8.92 21.2805 10.084L19.4585 10.156C19.3975 9.532 18.9455 9.1 18.4295 9.124C17.9135 9.148 17.5115 9.616 17.5115 10.228C17.5115 10.828 17.8955 11.296 18.4295 11.296H21.2805V12.4H18.4535C17.8295 12.4 17.4395 12.892 17.4395 13.516C17.4395 14.128 17.8535 14.596 18.4295 14.608C18.9575 14.608 19.3895 14.188 19.4585 13.576L21.2805 13.636C21.2195 14.992 20.1755 15.82 19.1015 15.832C18.0275 15.832 16.9415 14.992 16.9415 13.66L16.9405 10.36Z" fill="#000000"/>
        <path d="M22.0463 15.7H23.5103V8.28398H22.0463V15.7Z" fill="#000000"/>
        <path d="M28.0935 8.28398L26.1135 13.116L26.1015 13.116L24.1215 8.28398H22.6155L25.3035 15.7H26.9055L29.5935 8.28398H28.0935Z" fill="#000000"/>
        <path d="M15.4208 8.0163C15.0128 8.0163 14.6168 8.1603 14.3048 8.4483C14.0048 8.1483 13.6088 7.9923 13.2008 7.9923C12.3368 7.9923 11.6648 8.6643 11.6648 9.5283C11.6648 10.1523 11.9648 10.6083 12.3968 10.9563C12.1808 11.3163 12.0608 11.7243 12.0608 12.1443C12.0608 13.4403 12.9848 14.3643 14.2808 14.3643C14.8808 14.3643 15.4208 14.1243 15.8048 13.7523C15.6368 13.0683 15.4568 11.8923 16.2968 11.3643C15.5408 10.8963 15.8528 9.7203 15.4208 8.0163Z" fill="#000000"/>
    </svg>
)

const MastercardIcon = () => (
    <svg role="img" aria-labelledby="mastercard-title" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="mastercard-title">Mastercard</title>
        <rect width="38" height="24" rx="4" fill="white"/>
        <circle cx="14" cy="12" r="6" fill="#EB001B"/>
        <circle cx="24" cy="12" r="6" fill="#F79E1B"/>
        <path d="M20 12C20 15.3137 17.3137 18 14 18V6C17.3137 6 20 8.68629 20 12Z" fill="#FF5F00"/>
    </svg>
)

export function Footer() {
  return (
    <footer className="bg-background text-foreground mt-24">
      <div className="container px-4 py-12 mx-auto">
        <div className="bg-footer rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-footer-foreground">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Sprout className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl">Beauty Book</span>
                    </Link>
                    <p className="text-sm">We are committed to providing an exceptional beauty service booking experience with fast and friendly service.</p>
                    <div>
                        <h3 className="text-sm font-semibold">Telp</h3>
                        <p className="text-sm">(225) 265-0118</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Mail</h3>
                        <p className="text-sm">hello@beautybook.com</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Address</h3>
                        <p className="text-sm">123 Beauty Lane, Suite 100, Los Angeles, CA 90210</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">General</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:underline">Terms And Conditions</Link></li>
                        <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:underline">Booking Information</Link></li>
                        <li><Link href="#" className="hover:underline">Cancellations & Refunds</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:underline">About Us</Link></li>
                        <li><Link href="#" className="hover:underline">Blog</Link></li>
                        <li><Link href="#" className="hover:underline">For Providers</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Help</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:underline">Contact</Link></li>
                        <li><Link href="#" className="hover:underline">FAQs</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-footer-foreground/10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-center md:text-left text-footer-foreground/80">&copy; {new Date().getFullYear()} Beauty Book. All Rights Reserved</p>
                    <div className="flex items-center gap-4 text-footer-foreground/80">
                        <Link href="#" aria-label="Instagram"><Instagram className="w-5 h-5 hover:text-primary transition-colors" /></Link>
                        <Link href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-primary transition-colors" /></Link>
                        <Link href="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-primary transition-colors" /></Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <VisaIcon />
                        <GPayIcon />
                        <PayPalIcon />
                        <ApplePayIcon />
                        <MastercardIcon />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
