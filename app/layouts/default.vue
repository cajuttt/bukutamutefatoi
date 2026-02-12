<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">  
        <slot />
      </div>
    </div>
  </div>  
</template>


<style>
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f4f6f8;
}

.card {
  background: white;
  width: 90%;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
}

h2 {
  margin: 0;
  color: #333;
}

.subtitle {
  color: #777;
  margin-bottom: 20px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}


button {
  background:#334155;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
}

input, textarea {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f1f5f9;
  text-align: left;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}

.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.4);
}

.modal-box {
  background: white;
  width: 350px;
  margin: 80px auto;
  padding: 20px;
  border-radius: 10px;
}

.modal-box input,
.modal-box textarea {
  width: 100%;
  margin-bottom: 10px;
}

.modal-btn {
  display: flex;
  justify-content: space-between;
}

.cancel {
  background: #9ca3af;
}

.jumlah {
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-right: 20px;
  margin-left: auto; 
}

.next {
  margin-top: 20px;
}

</style>