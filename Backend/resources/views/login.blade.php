<div class="">
    <form action="{{route('login') }}" method="post">
        @csrf
<input type="text" name="email" placeholder="email">
<input type="text" name="password" placeholder="password">
<button type="submit">Gửi</button>
    </form>
</div>