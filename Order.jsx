import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { fetchOrders, createOrder, updateOrder as updateOrderAPI, deleteOrder as deleteOrderAPI } from '../API/orders';
import { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure, addOrder as addOrderAction, updateOrder as updateOrderAction, deleteOrder as deleteOrderAction } from '../Redux/actions/Orders';
import { message } from 'antd';

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.Orders);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 4 });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedOrder, setEditedOrder] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [form] = Form.useForm(); // Initialize form
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
    fetchOrders()
      .then((orders) => {
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFailure(error));
      });
  }, [dispatch]);

  const handleEdit = (record) => {
    setEditedOrder(record);
    setEditModalVisible(true);
    setProducts(record.products); // Set products for editing
    form.setFieldsValue(record); // Set form fields value when modal opens
  };

  const handleCancel = () => {
    form.resetFields();
    setAddModalVisible(false);
    setEditModalVisible(false);
    setEditedOrder(null);
    setProducts([]); // Reset products
  };

  const handleAddOrder = async () => {
    try {
      const values = await form.validateFields();
      await createOrder({ ...values, products });
      dispatch(addOrderAction({ ...values, products }));
      form.resetFields();
      setAddModalVisible(false);
      setProducts([]); // Reset products
      message.success('Order Add successfully');

    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await updateOrderAPI(editedOrder._id, { ...values, products });
      // Update order in Redux
      dispatch(updateOrderAction(editedOrder._id, { ...values, products }));
      // Update order in database
      const updatedOrder = await updateOrderAPI(editedOrder._id, { ...values, products });
      // If the update was successful, close the modal
      if (updatedOrder) {
        setEditModalVisible(false);
        setEditedOrder(null);
        setProducts([]); // Reset products
      }
      message.success('Order Update successfully');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };
  

  const handleDelete = async (orderId) => {
    try {
      await deleteOrderAPI(orderId);
      dispatch(deleteOrderAction(orderId));
      message.success('Order Delete successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleProductAdd = () => {
    setProducts([...products, { product_id: '', quantity: '', price: '' }]);
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][key] = value;
    setProducts(updatedProducts);
  };

  const handleProductDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button size="small" onClick={() => handleReset(clearFilters)}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => {
      if (dataIndex === '_id' || dataIndex === 'customer_id' || dataIndex === 'status') {
        return <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />;
      }
      return null;
    },
    onFilter: (value, record) =>
      (dataIndex === '_id' || dataIndex === 'customer_id' || dataIndex === 'status')
        ? record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const buttonStyle = {
    backgroundColor: '#0C2D57',
    borderColor: '#0C2D57',
    color: '#ffffff',
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      ...getColumnSearchProps('_id'),
    },
    {
      title: 'Customer ID',
      dataIndex: 'customer_id',
      key: 'customer_id',
      align: 'center',
      ...getColumnSearchProps('customer_id'),
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      align: 'center',
      ...getColumnSearchProps('total_price'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Address',
      dataIndex: 'address_line',
      key: 'address_line',
      align: 'center',
      ...getColumnSearchProps('address_line'),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      align: 'center',
      ...getColumnSearchProps('city'),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      ...getColumnSearchProps('state'),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      align: 'center',
      ...getColumnSearchProps('country'),
    },
    {
      title: 'Postal Code',
      dataIndex: 'postal_code',
      key: 'postal_code',
      align: 'center',
      ...getColumnSearchProps('postal_code'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
      align: 'center',
      ...getColumnSearchProps('payment_method'),
    },  
    // Product Column
    {
      title: 'Product',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <div>
          {products.map((product, index) => (
            <div key={index}>
              <p>{`Product ID: ${product.product_id}`}</p>
              <p>{`Quantity: ${product.quantity}`}</p>
              <p>{`Price: ${product.price}`}</p>
            </div>
          ))}
        </div>
      ),
    },    
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)} style={{ color: '#0C2D57', fontSize: '1.5em' }}>
            <EditOutlined />
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)} style={{ color: '#0C2D57', fontSize: '1.5em' }}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setAddModalVisible(true)}
        icon={<PlusOutlined />}
        style={{ backgroundColor: '#0C2D57', color: '#ffffff', marginBottom: '10px' }}
      >
        Add Order
      </Button>
      <Modal
  title="Add Order"
  visible={addModalVisible}
  onOk={handleAddOrder}
  onCancel={handleCancel}
  okButtonProps={{ style: buttonStyle }}
  cancelButtonProps={{ style: buttonStyle }}
>
  <Form form={form} layout="vertical">
    {/* Input fields for all the required properties */}
    <Form.Item name="customer_id" label="Customer ID" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="total_price" label="Total Price" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="payment_method" label="Payment Method" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="address_line" label="Address" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="city" label="City" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="state" label="State" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="country" label="Country" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="postal_code" label="Postal Code" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
      <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
    </Form.Item>
    {/* Product fields */}
    {products.map((product, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <Form.Item label={`Product ${index + 1}`}>
          <Input
            placeholder="Product ID"
            value={product.product_id}
            onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Input
            placeholder="Quantity"
            value={product.quantity}
            onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Input
            placeholder="Price"
            value={product.price}
            onChange={(e) => handleProductChange(index, 'price', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button
            type="danger"
            onClick={() => handleProductDelete(index)}
            icon={<DeleteOutlined />}
          />
        </Form.Item>
      </div>
    ))}
    <Button type="dashed" onClick={handleProductAdd} style={{ width: '100%' }}>
      Add Product
    </Button>
  </Form>
</Modal>
<Modal
title="Edit Order"
visible={editModalVisible}
onOk={handleUpdate}
onCancel={handleCancel}
okButtonProps={{ style: buttonStyle }}
cancelButtonProps={{ style: buttonStyle }}
>
<Form form={form} layout="vertical" initialValues={editedOrder}>
  {/* Input fields for all the required properties */}
  <Form.Item name="customer_id" label="Customer ID" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="total_price" label="Total Price" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="status" label="Status" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="payment_method" label="Payment Method" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="address_line" label="Address Line" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="city" label="City" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="state" label="State" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="country" label="Country" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="postal_code" label="Postal Code" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
    <Input style={{ borderColor: '#0C2D57', color: '#0C2D57' }} />
  </Form.Item>
  {/* Product fields */}
  {products.map((product, index) => (
    <div key={index} style={{ marginBottom: '10px' }}>
      <Form.Item label={`Product ${index + 1}`}>
        <Input
          placeholder="Product ID"
          value={product.product_id}
          onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Input
          placeholder="Quantity"
          value={product.quantity}
          onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Input
          placeholder="Price"
          value={product.price}
          onChange={(e) => handleProductChange(index, 'price', e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button
          type="danger"
          onClick={() => handleProductDelete(index)}
          icon={<DeleteOutlined />}
        />
      </Form.Item>
    </div>
  ))}
  <Button type="dashed" onClick={handleProductAdd} style={{ width: '100%' }}>
    Add Product
  </Button>
</Form>
</Modal>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={{
          ...pagination,
          itemRender: (current, type, originalElement) => {
            if (type === 'prev' || type === 'next') {
              return <Button style={{ borderColor: '#d9a74a', color: 'white' }}>{originalElement}</Button>;
            }
            return originalElement;
          },
        }} // Pass pagination state to the Table component with custom itemRender function
        onChange={setPagination} // Handle pagination change
      />
    </div>
  );
};

export default Order;
