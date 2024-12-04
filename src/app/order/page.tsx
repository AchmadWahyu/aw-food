import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneIcon as WhatsappIcon } from 'lucide-react'

const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.203237068818!2d106.81738397488888!3d-6.367739062290758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efbfb1078fa9%3A0xb40bcdaa4a4c808a!2sAW%20Food%20%26%20Snack!5e0!3m2!1sen!2sid!4v1732953576284!5m2!1sen!2sid';
const ORDER_TEXT = 'Halo%20Kak%2C%20saya%20mau%20pesan%20kue';

export default async function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Buat Pesanan</h1>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Hubungi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Free Tissue makan
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Pemesanan paling lambat H-2
              </p>
              <Button className="w-full mb-2 bg-green-600" asChild>
                <a
                  href={`https://wa.me/+628568056469?text=${ORDER_TEXT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <WhatsappIcon className="mr-2 h-4 w-4" />
                  Whatsapp 1
                </a>
              </Button>
              <Button className="w-full bg-green-600" asChild>
                <a
                  href={`https://wa.me/+6285693049424?text=${ORDER_TEXT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <WhatsappIcon className="mr-2 h-4 w-4" />
                  Whatsapp 2
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lokasi Toko</CardTitle>
              <CardDescription>Temukan kami di google maps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  src={MAP_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
