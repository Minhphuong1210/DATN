<form action="{{route('postLogin')}}" method="post">
    @csrf
<input type="text" name="email" id="" placeholder="email">
<input type="text" name="password" id="" placeholder="password">
<button type="submit">Gửi</button>
</form>