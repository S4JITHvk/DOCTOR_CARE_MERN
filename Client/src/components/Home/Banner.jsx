import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Depression",
    description: ` Dealing with depression can be overwhelming, but you're not alone in this journey. At Doctor Care, we understand the challenges of navigating mental health concerns, and our compassionate team is here to support you every step of the way.`,
    icon: CloudArrowUpIcon,
  },
  {
    name: "Sleepless",
    description: `Struggling with sleeplessness can take a toll on your physical and mental well-being, but you don't have to face it alone. At Doctor Care, we recognize the impact of insomnia and the importance of quality sleep for overall health. `,
    icon: LockClosedIcon,
  },
  {
    name: "Social Anxiety",
    description: `  Social anxiety can be overwhelming, making everyday interactions challenging and affecting your quality of life. But you're not alone in this journey. At Doctor Care, we understand the impact of social anxiety and the importance of finding effective coping strategies`,
    icon: ArrowPathIcon,
  },
  {
    name: "Suicide Thought",
    description: `Suicidal thoughts can be incredibly distressing and isolating, but it's essential to remember that help and support are available. At Doctor Care, we recognize the seriousness of suicidal ideation and are dedicated to providing compassionate care and resources to those in need.`,
    icon: FingerPrintIcon,
  },
];

export default function Example() {
  return (
    <div
      id="home"
      className="relative overflow-hidden bg-gradient-r from-[#3e1734] to-background pt-[120px] pb-[120px] md:pt-[120px] lg:pt-[160px]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="text-base font-semibold leading-7 text-indigo-600">
            MIND CARE
          </h1>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            MAKE YOUR MIND BEING FRESH..
          </p>
          <p className="mt-6 text-lg leading-8 font-bold text-gray-600">
            Whether you suffer from daily depression or get bouts of depressed
            feelings, it's important to remember you're not alone in your mental
            health ,"Mind Care" is here to feel your pain and care for you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white font-bold"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 font-bold text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <img
        className="absolute top-0 opacity-20 left-0 w-full h-full object-cover"
        src="https://wallpapercave.com/wp/wp10299388.jpg"
        // src="https://media.newyorker.com/photos/64177e0c6534701061ec3f19/master/pass/Bing_Ani_Final_B_2A.gif"
        alt=""
      />
    </div>
  );
}
