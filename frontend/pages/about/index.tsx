import React from "react";
import Image from "next/image";
function about() {
  const aboutUs = () => {
    return (
      <>
        <h1 className="font-bold text-5xl md:text-6xl">About</h1>
        <h1 className="font-semibold text-2xl"> What is an Agent?</h1>
        <p>
          For new users coming to this site it is hard to directly understand
          the point of an agent. The main website we buy our reps from is
          taobao.com/weidian.com. It is like a amazon or eBay for China - solely
          for China. The problem that results is that we need a connection
          between your country and China. You cannot buy from TaoBao directly
          (for most of the countries) and you probably would not understand
          anything. So here comes the agent in hand. You browse through your
          favorite TaoBao shops and find some items you want to buy. Now you do
          not buy it through TaoBao but through your agent (in our case
          WeGoBuy). WeGoBuy now buys this exact item and lets it deliver to
          their warehouse. You ask for pictures, measurements, exchanges,
          returns etc. When everything is fine WeGoBuy will package everything
          and deliver it to you. They are the connection between you and TaoBao.
        </p>
        <h1 className="font-semibold text-2xl"> Which agent to use?</h1>
        <p>
          We have experience with many agents and it would be fair for us to
          compare them. We do not want to call out Agents and tell about bad
          experiences with them but We will tell you that WeGoBuy was the one
          with the most professional, honest, fast and caring service We could
          ever experience. If it would not be good it would not be the most
          popular agent ever. There is no real price difference between agents,
          just use the one that will give you the best experience.
        </p>
      </>
    );
  };
  const weGoBuy = () => {
    return (
      <>
        <h1 className="font-bold text-4xl md:text-5xl">The WeGoBuy Guide</h1>{" "}
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-2xl">Sign up: </h1>
          <a
            target="_blank"
            href="https://login.wegobuy.com/en/page/login/?ref=https%3A%2F%2Fwww.wegobuy.com%2Fen%2F&type=register&partnercode=wKKgmn"
          >
            <div className="relative h-16 w-44 ">
              <Image
                className="rounded-xl"
                src="/wegobuy.png"
                objectFit="cover"
                layout="fill"
              />
            </div>
          </a>
        </div>
        <h1 className="font-semibold text-2xl">
          Ordering Process - How to order
        </h1>
        <ul className="list-decimal flex flex-col gap-5 pl-4">
          <li>
            Find the item you want on Taobao. try to find it yourself with image
            search or Google translate. or just go to one of our pages and copy
            the link from there
          </li>
          <li>
            Go to WeGoBuy, and hover over the{" "}
            <a
              target="_blank"
              href="https://res.cloudinary.com/dcpuvkirc/image/upload/v1678106162/defualt%20images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-06_143535_jjucct.png"
              className=" underline"
            >
              Shopping Agent input
            </a>{" "}
            on the navbar and paste your link into it.
          </li>
          <li>
            You will be taken to a page like{" "}
            <a
              target="_blank"
              href="https://res.cloudinary.com/dcpuvkirc/image/upload/v1678107385/defualt%20images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-06_144319_dhj5xp.png"
              className=" underline"
            >
              this
            </a>
            . Here, WeGoBuy translates the color and size options for you, and
            all you need to do is select the color and size you want. After, you
            can either <span className="font-bold">Add to Cart</span> or{" "}
            <span className="font-bold">Buy Now</span>.
          </li>
          <li>
            You will next be taken{" "}
            <a
              target="_blank"
              href="https://res.cloudinary.com/dcpuvkirc/image/upload/v1678107420/defualt%20images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-06_144406_fquciu.png"
              className=" underline"
            >
              to this page
            </a>{" "}
            . Here, you have to select your country from the
            <span className="font-bold"> Choose Destination Country</span> box,
            then hit submit to be taken to the payment screen.
          </li>
          <li>
            If you have an existing balance in your WeGoBuy account from
            previous purchases that you have returned, you can use that to buy
            the product.
          </li>
          <li>
            <a
              target="_blank"
              href="https://res.cloudinary.com/dcpuvkirc/image/upload/v1678107477/defualt%20images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-06_144458_gidpmz.png"
              className=" underline"
            >
              Here
            </a>{" "}
            , just select Paypal and pay for your order or use your balance from
            older orders. Sometimes WeGoBuy will not allow you to use PayPal and
            that is when you need to simply top up your balance instead of doing
            a direct order with PayPal.
          </li>
          <li>
            Now, just wait until the seller ships his order. Once it arrives in
            the WeGoBuy warehouse, you will receive a notification.
          </li>
          <li>
            You can always see information and updates and your all previous
            orders in the{" "}
            <a
              target="_blank"
              href="https://res.cloudinary.com/dcpuvkirc/image/upload/v1678107789/defualt%20images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-06_144727_bh3wtr.png"
              className=" underline"
            >
              orders
            </a>{" "}
            section
          </li>
          <li>
            Once your product arrives, hover over your username in the navbar
            and select{" "}
            <a
              target="_blank"
              href="https://res.cloudinary.com/dcpuvkirc/image/upload/v1678107583/defualt%20images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-06_144630_purmht.png"
              className=" underline"
            >
              My Warehouse
            </a>
            . Here, you can view QC, or quality control, pictures that WeGoBuy{" "}
            <a>takes</a>. One con of using WeGoBuy is their picture taking
            skills. To receive better pictures, you have to contact their live
            chat and give them your order number and request better QC pictures.
          </li>
          <li>
            If you're satisfied with your order, select it and click Submit in
            the lower right corner. Here, you can choose your preferred shipping
            method. It's up to you what line you would like to use (best one is
            the cheapest one). Just select the shipping line, then click Submit
            Delivery Order to have WeGoBuy pack up your products and send it to
            your door.
          </li>
          <li>
            After WeGoBuy shipped you pack you can see the{" "}
            <a
              target="_blank"
              href="https://res.cloudinary.com/dcpuvkirc/image/upload/v1678108137/defualt%20images/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-06_144751_pojboz.png"
              className=" underline"
            >
              Tracking number
            </a>{" "}
            and the refund for your shipping on the parcel section
          </li>
          <li>After your package arrived post it here!</li>
        </ul>
      </>
    );
  };
  return (
    <div className="max-w-6xl mx-auto p-10 flex flex-col gap-10">
      {aboutUs()}
      {weGoBuy()}
    </div>
  );
}

export default about;
