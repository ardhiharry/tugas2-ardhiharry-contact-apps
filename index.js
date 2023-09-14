// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama : '',
    nomorHp : ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Reset Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Hapus Data \n");
    console.log("0.Exit \n");
    readline.question(`Silahkan Masukan Pilihan Anda: `, input => {
        mainMenu(Number(input));
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            console.clear();
            simpan();
            break;
        case 2:
            console.clear();
            lihatData();
            break;
        // lanjutkan menu pilihanya disini secara urut
        case 3:
            console.clear();
            resetData();
            break;
        case 4:
            console.clear();
            pencarianData();
            break;
        case 5:
            console.clear();
            hapusData();
            break;
        case 0:
            console.clear();
            readline.close();
            break;
        default:
            console.clear();
            console.log("Pilihan Tidak Valid!");
            viewMenu();
            break;
    }
}



function simpan() { // fungsi untuk menyimpan data
    console.log("\nSilahkan Masukan Data!");
    readline.question("Nama: ", (nama) => {
        if( nama.match(/^[a-zA-Z ]*$/) ) {
            objectKontak.nama = nama
            ambilInputanNomor();
        } else {
            console.log("\nInput harus berupa huruf!");
            simpan();
        }
    });
    
}
const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor: ", (nomor) => {
        if ( nomor.match(/^(\+62|62|0)8[1-9][0-9]{6,9}$/) ) {
            objectKontak.nomorHp = nomor;
            databaseKontak.push(Object.assign({}, objectKontak));
            console.log("Input data berhasil");
            kembali();
        } else {
            console.log("\nInput harus berupa nomor dan sesuai dengan format nomor Indonesia!");
            console.log("contoh: +628xx | 628xx | 08xx");
            ambilInputanNomor();
        }
    });
}
const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("\nApakah Anda Ingin Kembali? (y/n): ", (pilihan) => {
        if(pilihan === "y"){
            console.clear();
            viewMenu();
        }else {
            console.clear();
            readline.close();
        }
        
    });
}

function lihatData () { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali();
}

function resetData () {
    // tambahkan fungsi reset  data disini
    readline.question("Apakah anda ingin reset semua data? (y/n): ", (pilihan) => {
        if(pilihan === "y") {
            while(databaseKontak.length) {
                databaseKontak.pop();
            }
            console.log("Data berhasil direset!");
            kembali();
        } else {
            console.clear();
            viewMenu();
        }
    });
}

function cariKontak(keyword) {
    return databaseKontak.filter((contact) => contact.nama.toLowerCase().includes(keyword.toLowerCase()) || contact.nomorHp.includes(keyword));
}

function pencarianData () {
    // tambahkan fungsi pencarian data disini
    console.log("Masukkan kata kunci pencarian!");
    readline.question("Kata Kunci: ", (keyword) => {
        console.table(cariKontak(keyword));
        kembali();
    });
}
function hapusData () {
    // tambahkan fungsi hapus data data disini
    console.log("Masukkan index data yang ingin dihapus!");
    console.table(databaseKontak);
    readline.question("index: ", (index) => {
        databaseKontak.splice(index, 1);

        console.log("\nData berhasil dihapus!")
        kembali();
    });
}


viewMenu(); // panggil fungsi view menu untuk pertama kali