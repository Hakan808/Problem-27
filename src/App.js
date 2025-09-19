import { Switch } from '@headlessui/react'
import { useRef  ,useState, useEffect} from 'react'

// Aşağıdaki Toggle bileşeni aç/kapat anahtarı (switch) olarak çalışmaktadır.
// Ancak şu anda bazı eksiklikler ve iyileştirilmesi gereken noktalar bulunmaktadır.
// Amacınız useRef kullanarak bileşeni daha sağlam ve kontrollü hale getirmektir.

// ✅ useRef kullanarak bileşenin önceki durumunu saklayın ve console.log ile her değişimde eski ve yeni değeri yazdırın.
// ✅ Toggle değişimlerini takip etmek için useRef kullanarak bir sayaç oluşturun (kaç kere açılıp kapandığını takip edin).
// ✅ useRef ile bileşene odaklanmayı sağlayın. Toggle bileşeni ilk yüklendiğinde otomatik olarak odaklansın.
// ✅ Toggle durumunun son halini kaydetmek için bir useRef değişkeni oluşturun ve bileşen kapandığında son durumu localStorage'a kaydedin.
// ✅ useRef ile bir DOM referansı oluşturarak, toggle bileşenine her tıklandığında hafifçe büyümesini sağlayın (örn: scale animasyonu).

// Bonus:
// ✨ Toggle açık/kapalı durumunda bileşenin genişliğini değiştirin:
//    - Açıkken w-16, kapalıyken w-11 olacak şekilde dinamik genişlik ayarlayın.
// ✨ Toggle değiştiğinde ikon değişimi ekleyin:
//    - Açıkken bir "güneş" ikonu (🌞), kapalıyken bir "ay" ikonu (🌙) gösterin.
// ✨ Butona basıldığında küçük bir vibrate efekti ekleyin (animate-wiggle gibi özel Tailwind animasyonu oluşturun).
// ✨ Switch'in durumuna göre arkaplanına blur ve backdrop-filter efekti ekleyerek cam efekti verin (backdrop-blur-md gibi).
// ✨ Toggle butonuna "arka plan değişimi" efekti ekleyin:
//    - Buton kapalıysa mat renkler, açık olduğunda gradient bir arka plan oluşturun.
// ✨ Kullanıcının Tab tuşuyla navigasyon yapabilmesini sağlamak için Tailwind'in focus-visible özelliklerini kullanın.
// ✨ peer özelliğini kullanarak toggle açıkken yanında ekstra bir bilgi gösterecek şekilde geliştirin (örn: "Premium aktif")

export default function Toggle() {
  const [enabled, setEnabled] = useState(true);
  const prevStateRef = useRef(enabled);
  const toggleCountRef = useRef(0);
  const lastStateRef = useRef(enabled);
  const switchRef = useRef(null);


  useEffect(() => {
    if (switchRef.current) {
      switchRef.current.focus();
    }
  }, []);


  useEffect(() => {
    console.log("Önceki:", prevStateRef.current, " | Yeni:", enabled);
    if (prevStateRef.current !== enabled) {
      toggleCountRef.current += 1;
      console.log("Toggle sayısı:", toggleCountRef.current);
    }
    prevStateRef.current = enabled;
    lastStateRef.current = enabled;

    if (!enabled) {
      localStorage.setItem("toggleState", JSON.stringify(lastStateRef.current));
    }
    if (switchRef.current) {
      switchRef.current.classList.add("scale-110");
      setTimeout(() => {
        switchRef.current.classList.remove("scale-110");
      }, 150);
    }
  }, [enabled]);

  return (
    <div className="p-8 flex flex-col items-center gap-3">
      <Switch.Group as="div" className="flex items-center">
        <Switch
          ref={switchRef}
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 w-16 backdrop-blur-md"
              : "bg-gray-300 w-11"
          } relative inline-flex h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2`}
        >
          <span
            aria-hidden="true"
            className={`${
              enabled ? "translate-x-9" : "translate-x-0"
            } pointer-events-none inline-flex items-center justify-center h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out`}
          >
            {enabled ? "🌞" : "🌙"}
          </span>
        </Switch>
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">Yıllık fatura</span>{" "}
          <span className="text-gray-500">(%10 Tasarruf Edin)</span>
        </Switch.Label>
      </Switch.Group>
      <p
        className={`text-sm font-semibold transition-opacity ${
          enabled ? "opacity-100 text-green-600" : "opacity-0"
        }`}
      >
        🎉 Premium aktif!
      </p>
    </div>
  );
}
