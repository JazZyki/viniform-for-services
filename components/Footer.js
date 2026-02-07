import Link from 'next/link';
export default function Footer() {
    return (
        <footer className="absolute bottom-0 left-1/2 text-center text-sm text-gray-500 mt-8 mb-2 -translate-x-1/2">
            <p>
                &copy; {new Date().getFullYear()} Vinicars. Všechna práva
                vyhrazena.
            </p>
            <p>
                Programed by
                <Link
                    href="https://jazzyki.cz"
                    target="_blank"
                    className="text-maingreen hover:underline ml-1 transition-all"
                >
                    Jakub Zykl
                </Link>
            </p>
        </footer>
    );
}
