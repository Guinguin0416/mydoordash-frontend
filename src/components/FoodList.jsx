import React from "react";
import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => message.success(`Successfully add item`))
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};

const FoodList = () => {
    /**
     * states:
     * 1. state for current restaurant 用户选中的是哪一个餐厅
     * 2. state for the food of selected restaurant
     * 3. state for loading, 下拉菜单的时候loading，以及选中food时候的loading
     * 4. state for all restaurants available 可供选择的餐厅有哪些 (only set the state once)
     */
  const [foodData, setFoodData] = useState([]); // 每一个餐厅有哪些food，初始状态是空的array
  const [curRest, setCurRest] = useState();  
  const [restaurants, setRestaurants] = useState([]); 
  const [loading, setLoading] = useState(false); // loadingMenu, setLoadingMenu
  const [loadingRest, setLoadingRest] = useState(false);

  useEffect(() => {
    setLoadingRest(true);
    getRestaurants()
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []); // 只会render一次，only for didmount

  useEffect(() => { // 当用于选择了某个restaurant，找对应的food信息
    if (curRest) {
      setLoading(true);
      getMenus(curRest)
        .then((data) => { // 把data load进FoodData
          setFoodData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]); // 只有curRest变了，当前选择的菜单变了，才会重新render不同的菜单；didmount + didupdate

  return (
    <>
      <Select
        value={curRest}
        onSelect={(value) => setCurRest(value)}
        placeholder="Select a restaurant"
        loading={loadingRest}
        style={{ width: 300 }}
        onChange={() => {}}
      >
        {restaurants.map((item) => {
          return <Option key={item.id} value={item.id}>{item.name}</Option>;
        })}
      </Select>
      {curRest && (
        <List
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 3,
            xxl: 3,
          }}
          dataSource={foodData}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                extra={<AddToCartButton itemId={item.id} />}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ height: 340, width: "100%", display: "block" }}
                />
                {`Price: ${item.price}`}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default FoodList;