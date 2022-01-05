import React, { FC } from 'react';
import Filter from '../ui/Filter';
import { Tab, Tabs } from '../ui/Tabs';
import classes from './Products.module.scss';

const filterParams = [
  {
    id: '0',
    title: 'Categories',
    list: [
      {
        id: 'Categories_0',
        label: 'House Plants',
      },
      {
        id: 'Categories_1',
        label: 'Potter Plants',
      },
      {
        id: 'Categories_2',
        label: 'Seeds',
      },
    ],
  },
  {
    id: '1',
    title: 'Size',
    list: [
      {
        id: 'Size_0',
        label: 'Small',
      },
      {
        id: 'Size_1',
        label: 'Medium',
      },
      {
        id: 'Size_2',
        label: 'Large',
      },
    ],
  },
];

const rangeParams = {
  title: 'Price Range',
  min: 0,
  max: 1000000,
};

export const Products: FC = () => {
  const rangeApplyFilter = (min: number, max: number) => {
    console.log(min, max);
  };
  const applyFilter = (filter: string, category: string) => {
    console.log(filter, category);
  };

  return (
    <div className={classes.products}>
      <div className={classes.products__filter}>
        <Filter
          filterProps={filterParams}
          applyFilter={applyFilter}
          range={{ ...rangeParams, applyRangeFilter: rangeApplyFilter }}
        />
      </div>
      <div>
        <Tabs>
          <Tab label='All Plants' uniqKey={0}>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
              suscipit, minus quo eos iste modi error porro, sunt similique
              totam quam corrupti voluptatum aliquid ab, doloremque veritatis
              numquam adipisci! Quo? Debitis magnam libero dolorum nostrum
              veritatis illo consectetur aliquid maiores natus deserunt maxime
              eligendi facilis nemo, autem eum. Excepturi, maiores aperiam?
              Itaque veritatis deleniti asperiores aliquam distinctio
              repudiandae explicabo illum? Recusandae quia quod eligendi. Est
              eaque, facilis, molestiae alias pariatur perferendis distinctio
              nulla quisquam iure libero error facere aliquam numquam eos.
              Libero alias assumenda laboriosam architecto, fugit quidem
              suscipit similique! Omnis ipsam architecto voluptatibus eum.
              Veritatis eius tempora iusto dolorem quae! Quaerat a deleniti
              distinctio, optio dolore quo eius nisi dolor id nihil? At
              perspiciatis ipsa ipsam quidem voluptatem veniam! Consequatur
              molestiae voluptate eius cum et mollitia, fugiat, reiciendis
              provident sequi officia corporis atque ut nam quibusdam tempore?
              Quidem laudantium veritatis ullam quasi aliquid doloribus qui odio
              recusandae, beatae repudiandae?
            </div>
          </Tab>
          <Tab label='New Arrivals' uniqKey={1}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            suscipit, minus quo eos iste modi error porro, sunt similique totam
            quam corrupti voluptatum aliquid ab, doloremque veritatis numquam
            adipisci! Quo? Debitis magnam libero dolorum nostrum veritatis illo
            consectetur aliquid maiores natus deserunt maxime eligendi facilis
            nemo, autem eum. Excepturi, maiores aperiam? Itaque veritatis
            deleniti asperiores aliquam distinctio repudiandae explicabo illum?
            Recusandae quia quod eligendi. Est eaque, facilis, molestiae alias
            pariatur perferendis distinctio nulla quisquam iure libero error
            facere aliquam numquam eos. Libero alias assumenda laboriosam
            architecto, fugit quidem suscipit similique! Omnis ipsam architecto
            voluptatibus eum. Veritatis eius tempora iusto dolorem quae! Quaerat
            a deleniti distinctio, optio dolore quo eius nisi dolor id nihil? At
            perspiciatis ipsa ipsam quidem voluptatem veniam! Consequatur
            molestiae voluptate eius cum et mollitia, fugiat, reiciendis
            provident sequi officia corporis atque ut nam quibusdam tempore?
            Quidem laudantium veritatis ullam quasi aliquid doloribus qui odio
            recusandae, beatae repudiandae?
          </Tab>
          <Tab label='Sale' uniqKey={2}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
            suscipit, minus quo eos iste modi error porro, sunt similique totam
            quam corrupti voluptatum aliquid ab, doloremque veritatis numquam
            adipisci! Quo? Debitis magnam libero dolorum nostrum veritatis illo
            consectetur aliquid maiores natus deserunt maxime eligendi facilis
            nemo, autem eum. Excepturi, maiores aperiam? Itaque veritatis
            deleniti asperiores aliquam distinctio repudiandae explicabo illum?
            Recusandae quia quod eligendi. Est eaque, facilis, molestiae alias
            pariatur perferendis distinctio nulla quisquam iure libero error
            facere aliquam numquam eos. Libero alias assumenda laboriosam
            architecto, fugit quidem suscipit similique! Omnis ipsam architecto
            voluptatibus eum. Veritatis eius tempora iusto dolorem quae! Quaerat
            a deleniti distinctio, optio dolore quo eius nisi dolor id nihil? At
            perspiciatis ipsa ipsam quidem voluptatem veniam! Consequatur
            molestiae voluptate eius cum et mollitia, fugiat, reiciendis
            provident sequi officia corporis atque ut nam quibusdam tempore?
            Quidem laudantium veritatis ullam quasi aliquid doloribus qui odio
            recusandae, beatae repudiandae?
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
