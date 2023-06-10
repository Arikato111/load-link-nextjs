import { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";

type HomeProps = {
  text: string;
};

export default function Home(props: HomeProps) {
  useEffect(() => {
    // axios.get('/api/test').then( res => {
    //   console.log(res.data)
    // })
  }, []);
  return (
    <>
      <Head>
        <title>home</title>
      </Head>
      <main>
        <h3>Hello World</h3>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem maxime rerum architecto dicta sed, quasi delectus numquam repellat repudiandae, praesentium nulla? Voluptatum eligendi voluptates qui exercitationem, commodi quaerat fugiat incidunt!
          Corrupti accusantium esse labore beatae, deleniti fugit dolore veniam assumenda placeat est quaerat quas dignissimos necessitatibus doloribus ipsum numquam et vitae id aut maiores eius aperiam! Recusandae adipisci voluptatum numquam.
          Consectetur officiis quae corporis deserunt dolor amet at eaque ipsum voluptate voluptas veritatis minus enim consequatur, consequuntur, itaque soluta perferendis aliquam hic quia. Consequuntur odit odio quod sed neque. Quasi!
          In beatae magnam eos fuga nostrum iure ipsam? Odio dignissimos porro, cumque tenetur doloribus quibusdam. Corporis, ratione, ut neque velit nulla repellendus veritatis itaque sed magnam, quasi a aut dolor.
          Molestias voluptates eligendi ex, dolore architecto sunt delectus quae assumenda eos autem dolor qui corporis doloremque esse nulla quasi itaque fugit obcaecati? Delectus, nesciunt illum. Qui harum nulla quibusdam eveniet.
          Necessitatibus a, odit magni sequi quis labore blanditiis inventore. Maxime illo dolor saepe minus, a corrupti ullam, eum nesciunt libero deserunt, magni distinctio accusantium eveniet odit! Dolor ad voluptatibus maiores.
          Officiis officia vitae, facilis autem recusandae, minus, quisquam obcaecati maxime magni quam ducimus. Eum cupiditate maxime in suscipit ad doloribus eos vitae optio necessitatibus autem laboriosam vel, dolores adipisci numquam.
          Obcaecati doloribus quod, fuga facilis sunt expedita vel perspiciatis et quae, laudantium numquam repudiandae! Ipsum autem libero dignissimos veritatis distinctio explicabo sunt laboriosam! Quas, provident laborum? Pariatur ipsum temporibus architecto?
          Dignissimos voluptatem obcaecati, deleniti officia temporibus amet, at doloremque magni, architecto hic voluptas laudantium tempore nobis impedit dolor ullam alias. Sit reiciendis perspiciatis recusandae accusamus aspernatur voluptatem vel nemo ea.
          Ullam ipsum veritatis nesciunt autem consequatur reiciendis assumenda harum modi adipisci ipsam odit esse perferendis sit impedit dignissimos quasi, quod provident possimus mollitia sed. Dolore sed voluptate aspernatur quaerat facilis?
          Alias obcaecati sunt tempore totam quod nostrum distinctio repudiandae illo rem, reiciendis explicabo expedita molestias laborum exercitationem, impedit consequatur commodi corporis et numquam nemo placeat ratione eligendi. Eos, ipsa inventore?
          Mollitia quae quaerat et accusantium delectus, necessitatibus exercitationem cupiditate obcaecati ad vero possimus perferendis doloremque adipisci sed asperiores? Aliquid optio nobis nam alias rem accusamus at numquam doloremque architecto itaque!
          Nam nulla exercitationem tenetur, quae eum aperiam quos sed eaque? Eveniet autem ipsam culpa velit dolor quas, esse aliquam, ipsum nobis repudiandae animi doloribus nemo. Aspernatur sunt quos eveniet corrupti.
          Reprehenderit inventore doloribus similique voluptas deleniti quod voluptatum tempore omnis, eos dicta sint quis magnam laborum quas odit at modi. Alias accusamus, ipsum fugit obcaecati porro blanditiis perspiciatis quam corporis?
          Possimus ipsa accusamus obcaecati blanditiis quis consequatur impedit amet temporibus totam facilis autem saepe, culpa voluptatum praesentium in corrupti nam dolores aspernatur dolorum voluptas distinctio enim tenetur! Atque, eius fugit.
          Unde at cumque minima, tenetur necessitatibus officia, vero ipsam quaerat quis consequatur assumenda accusamus. Totam molestiae aliquid dolore, deleniti, autem, repellat error voluptatem repellendus mollitia cumque nesciunt tempora sunt. Magnam?
          Voluptate sint praesentium itaque, velit animi nesciunt, cumque blanditiis dolorem facere aliquam non libero nostrum fugiat? Itaque aperiam obcaecati excepturi nobis consectetur quae veritatis molestias quia nemo. Alias, totam perferendis.
          Modi, quasi a repellendus cumque numquam magnam non illum accusantium earum quibusdam aliquam quae veniam alias quisquam cum eligendi incidunt impedit ullam enim iste voluptate obcaecati dolorem? Culpa, architecto ut!
          Excepturi illo nesciunt voluptatum saepe eos dignissimos harum inventore assumenda, sequi vitae, distinctio iusto ipsa dolore doloremque! Aspernatur quos laboriosam animi incidunt provident! Dignissimos minus aspernatur dolorem ad quo doloribus.
          Sed, magni dicta, minus ex in fugiat tempora perspiciatis minima sequi nobis numquam eaque autem explicabo veniam labore provident dolorem quos nam expedita optio rerum porro voluptates reprehenderit nulla! Qui?
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let text: string = "soon";
  return {
    props: {
      text,
    },
  };
};
