import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function ProductForm() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    fetchTecnicos();
  }, []);
  const fetchTecnicos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/productos`);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value);
    setSelectedProduct(
      productos.find((producto) => producto.id_producto === productId)
    );
  };
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const handleAddProduct = () => {
    // Cierra el modal
    handleCloseModal();
    // Limpia los campos después de agregar el producto
    setSelectedProduct(null);
    setQuantity(0);
  };
  return (
    <div>
      <Button onClick={handleShowModal}>Seleccionar Producto</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Producto:</Form.Label>
              <Form.Control as="select" onChange={handleProductChange}>
                <option value="">Seleccione un producto</option>
                {productos.map((producto) => (
                  <option
                    key={producto.id_producto}
                    value={producto.id_producto}
                  >
                    {producto.nombre_producto}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {selectedProduct && (
              <Form.Group>
                <Form.Label>Cantidad:</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Agregar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ProductForm;
