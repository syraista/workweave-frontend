import Navigationabar from "../../component/Navigationbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Footer from "../../component/Footer";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function KategoriItem() {
  const workerId = Cookies.get('id');
  const [projectData, setProjectData] = useState([]);
  const { item } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/client/projects/${item}`
        );
        const project = response.data.data.project; // Accessing project array
        setProjectData(project);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    namaLengkap: "",
    alamatEmail: "",
    nomorHandphone: "",
    jenisKelamin: "",
    keterampilan: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [activeDescButton, setActiveDescButton] = useState("about");
  const [showModalform, setShowModalform] = useState(false);
  const handleCloseModalform = () => {
    setShowModalform(false);
  };
  const handleOpenModalform = () => {
    setShowModalform(true);
  };

  const [showModalformresult, setShowModalformresult] = useState(false);
  const handleCloseModalformresult = () => {
    handleCloseModalform();
    setShowModalformresult(false);
  };
  const handleOpenModalformresult = () => {
    const fetchData = async () => {
      try {
        const request = {
          worker_id: workerId
        }
        console.log(request);
        const response = await axios.post(
          `http://localhost:3000/api/worker/projects/${item}/applications`, request
        );
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setShowModalformresult(true);
  };

  return (
    <>
      <Navigationabar log={1} navn={1} />
      <section className="d-flex flex-column" style={{ padding: "88px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="position-relative d-flex">
            <img src="/assets/cat-databaseanxx.png" />
          </div>
          <div
            style={{
              width: "526px",
              height: "302px",
              backgroundColor: "#f4fafc",
              borderRadius: "15px",
              padding: "40px",
            }}
            className="d-flex flex-column justify-content-between align-items-center"
          >
            <h3
              style={{ fontSize: "27px", color: "#1f79e5", fontWeight: "bold" }}
            >
              {projectData.title}
            </h3>
            <p
              className="text-center"
              style={{ margin: "0", fontSize: "10.58px", color: "#4a4a4a" }}
            >
              {projectData.description}
            </p>
            <hr style={{ width: "100%", height: "2px" }} />
            <button
              onClick={handleOpenModalform}
              style={{
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#1f79e5",
                color: "white",
                fontSize: "18px",
                width: "145px",
                height: "45px",
                fontWeight: "bold",
              }}
            >
              GABUNG
            </button>
          </div>
        </div>
        <nav
          style={{
            borderBottom: "2px solid #4a4a4a",
            zIndex: "1",
            marginTop: "160px",
            marginBottom: "80px",
          }}
          className="d-flex flex-row position-relative justify-content-around w-100"
        >
          <p
            style={{
              margin: "0",
              backgroundColor: "transparent",
              border: "none",
              borderBottom: "3px solid #1f79e5",
              zIndex: "2",
              fontSize: "24px",
              color: "#7e7e7e",
              fontWeight: "600",
              visibility: "hidden",
            }}
          >
            X
          </p>
          <button
            onClick={() => setActiveDescButton("about")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderBottom:
                activeDescButton === "about" ? "3px solid #1f79e5" : "none",
              zIndex: "2",
              fontSize: "24px",
              color: activeDescButton === "about" ? "#1f79e5" : "#7e7e7e",
              fontWeight: "600",
              position: "absolute",
              left: "20px",
            }}
          >
            Tentang Project
          </button>
          <button
            onClick={() => setActiveDescButton("desc")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderBottom:
                activeDescButton === "desc" ? "3px solid #1f79e5" : "none",
              zIndex: "2",
              fontSize: "24px",
              color: activeDescButton === "desc" ? "#1f79e5" : "#7e7e7e",
              fontWeight: "600",
              position: "absolute",
              left: "30%",
            }}
          >
            Deskripsi Pekerjaan
          </button>
          <button
            onClick={() => setActiveDescButton("result")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderBottom:
                activeDescButton === "result" ? "3px solid #1f79e5" : "none",
              zIndex: "2",
              fontSize: "24px",
              color: activeDescButton === "result" ? "#1f79e5" : "#7e7e7e",
              fontWeight: "600",
              position: "absolute",
              right: "30%",
            }}
          >
            Hasil Kerja
          </button>
          <button
            onClick={() => setActiveDescButton("criteria")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderBottom:
                activeDescButton === "criteria" ? "3px solid #1f79e5" : "none",
              zIndex: "2",
              fontSize: "24px",
              color: activeDescButton === "criteria" ? "#1f79e5" : "#7e7e7e",
              fontWeight: "600",
              position: "absolute",
              right: "20px",
            }}
          >
            Kriteria Keberhasilan
          </button>
        </nav>
        <h3
          style={{
            fontSize: "36px",
            color: "#1f79e5",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          {projectData.title}
        </h3>

        <div
          className={`${
            activeDescButton === "about" ? "d-flex" : "d-none"
          } flex-column`}
        >
          <p
            style={{ fontSize: "24px", color: "#4a4a4a", marginBottom: "50px" }}
          >
            Latar Belakang:
            <br />
            Dalam konteks pertumbuhan e-commerce yang pesat, manajemen data
            pengguna dan penjual menjadi krusial untuk kesuksesan platform.
            Untuk itu, proyek ini ditujukan untuk membangun sebuah database yang
            menyimpan informasi pengguna dan penjual dengan sistematis dan
            efisien.
            <br />
            <br />
            Tujuan Proyek:
            <br />
            Tujuan utama dari proyek ini adalah menciptakan sebuah database yang
            dapat mengelola informasi pengguna dan penjual dengan akurat, aman,
            dan dapat diakses dengan cepat. Database ini akan menjadi pondasi
            bagi fitur-fitur lain dalam platform e-commerce, seperti
            personalisasi pengalaman pengguna, manajemen inventaris, dan
            analisis kinerja penjualan.
          </p>
          <h3
            style={{
              fontSize: "36px",
              color: "#1f79e5",
              fontWeight: "bold",
              marginBottom: "40px",
            }}
          >
            Pemilik Projek
          </h3>
          <div
            className="d-flex flex-column justify-content-between"
            style={{
              width: "642px",
              height: "229px",
              borderRadius: "20px",
              border: "1px solid #b2b2b2",
              padding: "30px",
            }}
          >
            <div style={{ gap: "20px" }} className="d-flex align-items-center">
              <img
                src="/assets/avatardummy.png"
                style={{ width: "57px" }}
                alt="image"
              />
              <hr
                style={{
                  width: "2px",
                  height: "60px",
                  backgroundColor: "grey",
                  margin: "0",
                }}
              />
              <h4 style={{ margin: "0", fontSize: "25px", fontWeight: "bold" }}>
                Zenarith Vandora
              </h4>
            </div>
            <div className="d-flex w-100 gap-3 justify-content-between">
              <div className="d-flex flex-column gap-2">
                <div
                  style={{ fontSize: "12px" }}
                  className="d-flex gap-2 align-items-center"
                >
                  <span
                    style={{ fontSize: "30px" }}
                    className="material-symbols-outlined"
                  >
                    location_on
                  </span>
                  Jl. Raya Seturan No. 27, Condongcatur
                  <br />
                  Depok, Sleman, Daerah Istimewa Yogyakarta
                </div>
                <div
                  style={{ fontSize: "12px" }}
                  className="d-flex gap-2 align-items-center"
                >
                  <span
                    style={{ fontSize: "30px" }}
                    className="material-symbols-outlined"
                  >
                    call
                  </span>
                  081225762844
                </div>
              </div>
              <div
                style={{ marginRight: "30px" }}
                className="d-flex flex-column gap-2"
              >
                <div
                  style={{ fontSize: "12px" }}
                  className="d-flex gap-2 align-items-center"
                >
                  <span
                    style={{ fontSize: "30px" }}
                    className="material-symbols-outlined"
                  >
                    mail
                  </span>
                  zevana@gmail.com
                </div>

                <div
                  style={{ fontSize: "12px" }}
                  className="d-flex gap-2 align-items-center"
                >
                  <span
                    style={{ fontSize: "30px" }}
                    className="material-symbols-outlined"
                  >
                    work
                  </span>
                  Programmer
                  <br />
                  PT. Idemu Sistem Sinergi
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            activeDescButton === "desc" ? "d-flex" : "d-none"
          } flex-column`}
        >
          <p style={{ fontSize: "24px", color: "#4a4a4a", marginBottom: "0" }}>
            Deskripsi Pekerjaan:
          </p>
          <ol style={{ fontSize: "24px", color: "#4a4a4a", marginBottom: "0" }}>
            <li>
              Perancangan Database: Tim akan merancang struktur database yang
              sesuai dengan kebutuhan platform e-commerce, termasuk tabel untuk
              menyimpan data pengguna dan penjual.
            </li>
            <li>
              Pengembangan Database: Setelah perancangan selesai, tim akan mulai
              mengimplementasikan desain database dengan menggunakan teknologi
              yang sesuai.
            </li>
            <li>
              Integrasi Data: Data pengguna dan penjual yang sudah ada akan
              diimpor ke dalam database baru dengan memastikan konsistensi dan
              integritas data.
            </li>
            <li>
              Fitur Keamanan: Tim akan menambahkan lapisan keamanan yang kuat
              untuk melindungi data sensitif pengguna dan penjual dari akses
              yang tidak sah.
            </li>
            <li>
              Pengujian: Database akan diuji secara menyeluruh untuk memastikan
              kinerjanya yang optimal, keandalannya, dan kecepatan akses data.
            </li>
            <li>
              Dokumentasi: Seluruh proses pembangunan database akan
              didokumentasikan dengan baik untuk referensi dan pemeliharaan masa
              depan.
            </li>
          </ol>
        </div>

        <div
          className={`${
            activeDescButton === "result" ? "d-flex" : "d-none"
          } flex-column`}
        >
          <p style={{ fontSize: "24px", color: "#4a4a4a", marginBottom: "0" }}>
            Hasil Kerja:
          </p>
          <ul style={{ fontSize: "24px", color: "#4a4a4a", marginBottom: "0" }}>
            <li>
              Database pengguna dan penjual yang berfungsi dengan baik dan
              terintegrasi dengan platform e-commerce.
            </li>
            <li>
              Dokumentasi lengkap tentang struktur database, proses
              pengembangan, dan panduan penggunaan.
            </li>
          </ul>
        </div>

        <div
          className={`${
            activeDescButton === "criteria" ? "d-flex" : "d-none"
          } flex-column`}
        >
          <p style={{ fontSize: "24px", color: "#4a4a4a", marginBottom: "0" }}>
            Kriteria Keberhasilan:
          </p>
          <ul style={{ fontSize: "24px", color: "#4a4a4a", marginBottom: "0" }}>
            <li>
              Fungsionalitas dan kinerja database yang sesuai dengan kebutuhan.
            </li>
            <li>Keamanan data yang terjamin.</li>
            <li>Penyelesaian proyek sesuai dengan jadwal yang ditentukan.</li>
            <li>
              Tingkat kepuasan pengguna dan penjual dalam penggunaan platform
              e-commerce setelah implementasi database.
            </li>
          </ul>
        </div>
      </section>

      <Modal
        show={showModalform}
        onHide={handleCloseModalform}
        centered
        dialogClassName="custom-modalapproval"
      >
        <Modal.Body className="d-flex flex-column p-5">
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#4a4a4a",
              marginBottom: "0px",
            }}
          >
            Formulir Pengajuan{" "}
            <span style={{ color: "#1f79e5" }}>Gabung Projek</span>
          </h2>
          <hr style={{ width: "100%", borderBottom: "2px solid black" }} />
          <Form className="d-flex flex-column gap-3">
            <div className="d-flex w-100 gap-4">
              <div
                style={{ width: "453px" }}
                className="d-flex flex-column gap-3"
              >
              </div>

              <div
                style={{ width: "453px" }}
                className="d-flex flex-column gap-3"
              >
              </div>
            </div>

            <Form.Group controlId="formCvUpload">
              <Form.Label
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#7e7e7e",
                }}
              >
                Unggah CV<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
          <div
            style={{ marginTop: "50px" }}
            className="d-flex w-100 flex-column align-items-end"
          >
            <button
              onClick={handleOpenModalformresult}
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                width: "257px",
                height: "55px",
                border: "none",
                borderRadius: "5px",
                color: "white",
                backgroundColor: "#1f79e5",
              }}
            >
              AJUKAN PENGAJUAN
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalformresult}
        onHide={handleCloseModalformresult}
        centered
        dialogClassName="custom-modal7"
      >
        <Modal.Body className="d-flex flex-column justify-content-between p-5">
          <div className="d-flex flex-column align-items-center h-100 gap-4 p-4">
            <img style={{ width: "80px" }} src="../../assets/Berhasil.png" />
            <h2
              style={{ fontSize: "30px", fontWeight: "bold", color: "#4a4a4a" }}
            >
              Pengajuan Berhasil di{" "}
              <span style={{ color: "#1F79E5" }}>Serahkan</span>
            </h2>
            <p style={{ fontSize: "14px", color: "#7e7e7e" }}>
              Silahkan menunggu informasi selanjutnya.
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
}
